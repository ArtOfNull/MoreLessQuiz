import React, { useEffect, useState } from 'react';
import films from '../films.json';
import { FilmCard, Film, GuessCard, BlankCard } from './Film';
import { RestartButton } from './PlayerButtons';
import styles from '../App.module.scss';
import Color from 'color-thief-react';
const filmArray: Film[] = films as Film[];
filmArray.sort(() => Math.random() - 0.5);


export const GameBoard: React.FC = () => {
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


    const WaitAfterGuessed = (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }


    const handleGuess = async (guess: 'more' | 'less') => {
        const leftRating = filmArray[leftFilmIndex].rating;
        const rightRating = filmArray[rightFilmIndex].rating;
        if ((guess === 'more' && leftRating <= rightRating) || (guess === 'less' && leftRating >= rightRating)) {
            setScore(score + 1);
            setIsRatingHidden(false);
            await WaitAfterGuessed(1500);
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
        filmArray.sort(() => Math.random() - 0.5);
        setIsMenuOn(false);
    };

    useEffect(() => {
        setHighscore(score >= highscore ? score : highscore);
    }, [score]);

    useEffect(() => {
        localStorage.setItem('highscore', JSON.stringify(highscore));
    }, [highscore]);


    return (
        <div className={styles.main_board}>
            <div className={isMenuOn ? `${styles.menu}` : `${styles.menu} ${styles.display_none}`}>
                <p className={styles.guess_response}>{guessResponse}</p>
                <p className={styles.score_text}>Score: {score}<br />Highscore: {highscore}</p>
                <RestartButton onClick={restartGame} />
            </div>
            <div className={!isMenuOn ? `${styles.gameboard}` : `${styles.gameboard} ${styles.display_none}`}>
                <div className={styles.filmcard_wrapper}>
                    <Color src={filmArray[leftFilmIndex].logo} format='hex'>
                        {({ data, loading, error }) => (
                            <FilmCard color={{ backgroundColor: data }} colorLoading={loading} colorError={error} film={filmArray[leftFilmIndex]} transition={isTransitioning} />
                        )}
                    </Color>
                    <div className={isMenuOn ? `${styles.film_divider} ${styles.display_none}` : `${styles.film_divider}`}></div>
                    <Color src={filmArray[rightFilmIndex].logo} format='hex'>
                        {({ data, loading, error }) => (
                            <GuessCard color={{ backgroundColor: data }} colorLoading={loading} colorError={error} film={filmArray[rightFilmIndex]} transition={isTransitioning} isHidden={isRatingHidden} OnClick={handleGuess} />
                        )}
                    </Color>
                    <Color src={filmArray[blankFilmIndex].logo} format='hex'>
                        {({ data, loading, error }) => (
                            <BlankCard color={{ backgroundColor: data }} colorLoading={loading} colorError={error} film={filmArray[blankFilmIndex]} transition={isTransitioning} />
                        )}
                    </Color>
                </div>

                <div className={isMenuOn ? `${styles.progress_field_wrapper} ${styles.display_none}` : `${styles.progress_field_wrapper}`}>
                    <p className={styles.progress_field_text}>{`${leftFilmIndex + 1}/${filmArray.length - 1}`}</p>
                </div>
            </div>
        </div>

    );
}

export default GameBoard;