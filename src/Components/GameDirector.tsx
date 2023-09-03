import React, { useState } from 'react';
import films from '../films.json';
import { FilmCard, Film, GuessCard, BlankCard } from './FilmCard';
import { MoreButton, LessButton } from './PlayerButtons';
import './style.css';


const filmArray: Film[] = films as Film[];

export const GameBoard: React.FC = () => {
    const [leftFilmIndex, setLeftFilmIndex] = useState(0);
    const [rightFilmIndex, setRightFilmIndex] = useState(1);
    const [blankFilmIndex, setBlankFilmIndex] = useState(2);
    const [score, setScore] = useState(0);
    const [isRatingHidden, setIsRatingHidden] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [guessResponse, setGuessResponse] = useState("You are Right!");

    const WaitAfterGuessed = (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleGuess = async (guess: 'more' | 'less') => {
        const leftRating = filmArray[leftFilmIndex].rating;
        const rightRating = filmArray[rightFilmIndex].rating;

        if ((guess === 'more' && leftRating < rightRating) || (guess === 'less' && leftRating > rightRating)) {
            // User guessed correctly
            setScore(score + 1);
            setIsRatingHidden(false);
            await WaitAfterGuessed(1000);
            setIsTransitioning(true);
            await WaitAfterGuessed(500);
            setIsRatingHidden(true);
            setLeftFilmIndex(rightFilmIndex);
            setRightFilmIndex(blankFilmIndex);
            setBlankFilmIndex(blankFilmIndex == filmArray.length - 1 ? 0 : blankFilmIndex + 1);
            setIsTransitioning(false);
        } else {
            // User made a mistake - end the game or display a message
            setGuessResponse("Sorry :( You are Wrong");
            setIsRatingHidden(false);
            await WaitAfterGuessed(1000);
            alert(`Game Over! Your Score: ${score}`);
        }
    };

    return (
        <div className='game-board'>
            <div className='film-cards'>
                <div className='cards-in-play'>
                    <FilmCard film={filmArray[leftFilmIndex]} transition={isTransitioning} />
                    <GuessCard film={filmArray[rightFilmIndex]} transition={isTransitioning} isHidden={isRatingHidden} />
                </div>
                {/* FilmCard component displays the film data */}
                <div className='blank-card-wrapper'>
                    <BlankCard film={filmArray[blankFilmIndex]} transition={isTransitioning} />
                </div>

            </div>
            <div className='progress-field'>
                <p>{isRatingHidden ? `Guessed: ${leftFilmIndex}/${filmArray.length - 1}` : guessResponse}</p>
            </div>
            <div className='buttons'>
                {/* MoreButton and LessButton components for user input */}
                <MoreButton onClick={() => handleGuess('more')} />
                <div className='filler'></div>
                <LessButton onClick={() => handleGuess('less')} />
            </div>
        </div>
    );
}

export default GameBoard;
