import React, { useEffect, useState } from 'react';
import films from '../films.json';
import { Film, GuessCard } from './Film';
import { RestartButton } from './PlayerButtons';
import styles from '../App.module.scss';
import { SetupColors, GetBlankColor } from '../ColorManager';


export const GameBoard: React.FC = () => {
    const [filmArray, setFilmArray] = useState<Array<Film>>([]);
    const [indexes, setIndexes] = useState<Array<number>>([0, 1, 2]);
    const [guessedFilmsArray, setGuessedFilmsArray] = useState<Array<Film>>([]);
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
    const [setupColors, setSetupColors] = useState(false);

    useEffect(() => {
        setFilmArray(films as Film[]);
        setFilmArray((prev) => {
            prev.sort(() => Math.random() - 0.5);
            setGuessedFilmsArray((guessed) => {
                guessed = [prev[indexes[0]], prev[indexes[1]], prev[indexes[2]]];
                return guessed;
            });
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
        const leftRating = filmArray[score].rating;
        const rightRating = filmArray[score + 1].rating;
        if ((guess === 'more' && leftRating <= rightRating) || (guess === 'less' && leftRating >= rightRating)) {
            setIsRatingHidden(false);
            console.log(filmArray);
            await WaitAfterGuessed(1500);
            setScore(score + 1);
            if (score == filmArray.length - 2) {
                setIsMenuOn(true);
            } else {
                setIsTransitioning(true);
                await WaitAfterGuessed(500);
                setIsRatingHidden(true);
                setIndexes((prevIndexes) => {
                    prevIndexes = [prevIndexes[0] + 1, prevIndexes[1] + 1, prevIndexes[2] > filmArray.length - 2 ? 0 : prevIndexes[2] + 1];
                    setGuessedFilmsArray((prevGuessedFilms) => {
                        prevGuessedFilms = [filmArray[prevIndexes[0]], filmArray[prevIndexes[1]], filmArray[prevIndexes[2]]];
                        return prevGuessedFilms;
                    });
                    return prevIndexes;
                });



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
        setIndexes(() => {
            return [0, 1, 2];
        })
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
            GetBlankColor(filmArray, score + 2).then(res => {
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
                    <div className={isMenuOn || isTransitioning ? `${styles.film_divider} ${styles.display_none}` : `${styles.film_divider}`}></div>
                    {guessedFilmsArray.map((film, index) => {
                        return <GuessCard key={film.logo} color={{ backgroundColor: colorArray[indexes[index]] }} film={film} filmIndex={indexes[index]} isTransitioning={isTransitioning} guessedCardTracker={score + 1} isRatingHidden={isRatingHidden} OnClick={handleGuess} />
                    })}
                </div>

                <div className={isMenuOn || isTransitioning ? `${styles.progress_field_wrapper} ${styles.display_none}` : `${styles.progress_field_wrapper}`}>
                    {score}
                </div>
            </div>
        </div>

    );



}

export default GameBoard;