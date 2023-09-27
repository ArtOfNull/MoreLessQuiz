import React, { useEffect, useState } from 'react';
import films from '../films.json';
import { FilmCard, Film, GuessCard, BlankCard } from './Film';
import { RestartButton } from './PlayerButtons';
import styles from '../App.module.scss';
import { SetupColors, GetBlankColor } from '../ColorManager';


export const GameBoard: React.FC = () => {
    const [filmArray, setFilmArray] = useState<Array<Film>>([]);
    const [leftFilmIndex, setLeftFilmIndex] = useState(0);
    const [rightFilmIndex, setRightFilmIndex] = useState(1);
    const [blankFilmIndex, setBlankFilmIndex] = useState(2);
    const [score, setScore] = useState(0);
    const storedHighscore = window.localStorage.getItem('highscore');
    const initialHighscore = storedHighscore ? JSON.parse(storedHighscore) : 0;
    const [highscore, setHighscore] = useState<number>(initialHighscore);
    const [isRatingHidden, setIsRatingHidden] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [guessResponse, setGuessResponse] = useState("You guessed everything!");
    const [isMenuOn, setIsMenuOn] = useState(false);
    const [changeBlankColor, setChangeBlankColor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [colorArray, setColorArray] = useState([""]);
    const [backgroundColor] = useState("#000000");
    const [setupColors, setSetupColors] = useState(false);
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        setFilmArray(films as Film[]);
        setFilmArray((prev) => {
            prev.sort(() => Math.random() - 0.5);
            setSetupColors(true);
            return prev;
        })
    }, []);

    useEffect(() => {
        if (setupColors) {
            SetupColors(filmArray).then(res => {
                setColorArray(res);
                setLoading(false);
                setSetupColors(false);

            })
        }

    }, [setupColors])

    const WaitAfterGuessed = (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    useEffect(() => {
        const resize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const sortArrays = () => {
        const numArray = Array.from(Array(filmArray.length).keys());
        const tempStrArray = new Array<string>;
        const tempFilmArray = new Array<Film>;
        numArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < filmArray.length; i++) {
            tempStrArray[i] = colorArray[numArray[i]];
            tempFilmArray[i] = filmArray[numArray[i]];
        }
        setFilmArray(tempFilmArray);
        setColorArray(tempStrArray);
    }


    const handleGuess = async (guess: 'more' | 'less') => {
        const leftRating = filmArray[leftFilmIndex].rating;
        const rightRating = filmArray[rightFilmIndex].rating;
        if ((guess === 'more' && leftRating <= rightRating) || (guess === 'less' && leftRating >= rightRating)) {
            setIsRatingHidden(false);
            await WaitAfterGuessed(1500);
            setScore(score + 1);
            if (score == filmArray.length - 2) {
                setIsMenuOn(true);
            } else {
                setIsTransitioning(true);
                await WaitAfterGuessed(500);
                setIsRatingHidden(true);
                setLeftFilmIndex(rightFilmIndex);
                setRightFilmIndex(blankFilmIndex);
                setBlankFilmIndex(blankFilmIndex == filmArray.length - 1 ? 0 : blankFilmIndex + 1);
                setIsTransitioning(false);
                setChangeBlankColor(true);
            }

        } else {
            setIsRatingHidden(false);
            await WaitAfterGuessed(1600);
            setGuessResponse("Sorry :(\n You are Wrong");
            setIsMenuOn(true);
        }
    };

    const restartGame = () => {
        setLeftFilmIndex(0);
        setRightFilmIndex(1);
        setBlankFilmIndex(2);
        setScore(0);
        setIsRatingHidden(true);
        setIsTransitioning(false);
        setGuessResponse("You guessed everything!");
        if (colorArray.length == filmArray.length) {
            sortArrays();
        } else {
            setFilmArray((prev) => {
                prev.sort(() => Math.random() - 0.5);
                setLoading(true);
                setSetupColors(true);
                return prev;
            })
        }
        setIsMenuOn(false);
    };

    useEffect(() => {
        setHighscore(score >= highscore ? score : highscore);
    }, [score]);

    useEffect(() => {
        localStorage.setItem('highscore', JSON.stringify(highscore));
    }, [highscore]);

    useEffect(() => {
        if (changeBlankColor && colorArray.length != filmArray.length) {
            GetBlankColor(filmArray, blankFilmIndex).then(res => {
                setColorArray([...colorArray, res]);
            });
            setChangeBlankColor(false);
        }
    }, [changeBlankColor]);

    if (isMenuOn) {
        return (
            <div className={styles.main_board}>
                <div className={isMenuOn ? `${styles.menu}` : `${styles.menu} ${styles.display_none}`}>
                    <p className={styles.guess_response}>{guessResponse}</p>
                    <p className={styles.score_text}>Score: {score}<br />Highscore: {highscore}</p>
                    <RestartButton onClick={restartGame} />
                </div>
            </div>
        )
    } else if (loading) {
        return (
            <div className={loading ? styles.loading_screen : `${styles.loading_screen} ${styles.display_none}`}>
                <div className="loading_wrapper">
                    <span>Loading...</span>
                    <div className="spinner"></div>
                </div>
            </div>
        )
    } else return (
        <div className={styles.main_board}>

            <div className={!isMenuOn && !loading ? `${styles.gameboard}` : `${styles.gameboard} ${styles.display_none}`}>
                <div className={styles.filmcard_wrapper}>
                    <FilmCard color={{ backgroundColor: colorArray[leftFilmIndex] }} film={filmArray[leftFilmIndex]} transition={isTransitioning} />
                    <div className={isMenuOn || isTransitioning ? `${styles.film_divider} ${styles.display_none}` : `${styles.film_divider}`}></div>
                    <GuessCard color={{ backgroundColor: colorArray[rightFilmIndex] }} film={filmArray[rightFilmIndex]} transition={isTransitioning} isHidden={isRatingHidden} OnClick={handleGuess} />
                    <BlankCard color={{ backgroundColor: colorArray[blankFilmIndex] }} film={filmArray[blankFilmIndex]} transition={isTransitioning} />
                </div>

                <div className={isMenuOn || isTransitioning ? `${styles.progress_field_wrapper} ${styles.display_none}` : `${styles.progress_field_wrapper}`}>
                    {score}
                </div>
            </div>
        </div>

    );



}

export default GameBoard;