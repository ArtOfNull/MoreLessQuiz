import React, { useState, useEffect } from 'react';
import styles from '../App.module.scss'

interface FilmRatingProps {
    ratingNumber: number;
    isHidden?: boolean;
    isGuessed?: boolean;
}

export const Rating: React.FC<FilmRatingProps> = ({ ratingNumber, isHidden, isGuessed }) => {
    const [ratingDisplay, setRatingDisplay] = useState<number>(0);
    useEffect(() => {
        const animationDuration = 1000;
        const animationSteps = 10;
        const stepValue = ratingNumber / animationSteps;
        setRatingDisplay(0.0);
        if (!isHidden) {
            let step = 0;
            const interval = setInterval(() => {
                if (step < animationSteps) {
                    step++;
                    setRatingDisplay((prevRating) => prevRating + stepValue);
                } else {
                    clearInterval(interval);
                    setRatingDisplay(ratingNumber);
                }
            }, animationDuration / animationSteps);

            return () => {
                clearInterval(interval);
            };
        }

    }, [isHidden]);

    return <div className={styles.filmcard_rating_number}>{isGuessed ? ratingDisplay.toFixed(1) : ratingNumber}</div>;
};

export default Rating;