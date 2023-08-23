import React, { useState } from 'react';
import films from '../films.json';
import { FilmCard, Film, GuessCard } from './FilmCard';
import { MoreButton, LessButton } from './PlayerButtons';
import './style.css';


const filmArray: Film[] = films as Film[];

export const GameBoard: React.FC = () => {
    const [leftFilmIndex, setLeftFilmIndex] = useState(0);
    const [rightFilmIndex, setRightFilmIndex] = useState(1);
    const [score, setScore] = useState(0);
    const [isRatingHidden, setIsRatingHidden] = useState(true);
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
            setIsRatingHidden(true);
            setLeftFilmIndex(rightFilmIndex);
            setRightFilmIndex(rightFilmIndex + 1);
        } else {
            // User made a mistake - end the game or display a message
            setGuessResponse("Sorry, you are Wrong :(");
            setIsRatingHidden(false);
            await WaitAfterGuessed(1000);
            alert(`Game Over! Your Score: ${score}`);
        }
    };

    return (
        <div className='gameboard'>
            <div className='filmcards'>
                {/* FilmCard component displays the film data */}
                <FilmCard film={filmArray[leftFilmIndex]} />
                <GuessCard film={filmArray[rightFilmIndex]} isHidden={isRatingHidden} message={guessResponse} />
            </div>
            <div>
                {/* MoreButton and LessButton components for user input */}
                <MoreButton onClick={() => handleGuess('more')} />
                <LessButton onClick={() => handleGuess('less')} />
            </div>
        </div>
    );
}

export default GameBoard;
