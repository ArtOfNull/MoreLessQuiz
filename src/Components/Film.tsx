import React from 'react';
import styles from '../App.module.scss';
import { MoreButton, LessButton } from './PlayerButtons';
import { Rating } from './Rating';
export type Film = {
    name: string;
    rating: number;
    logo: string;
}

type FilmProp = {
    film: Film;
    transition: boolean;
    color: React.CSSProperties;
    filmIndex: number;
    isTransitioning: boolean;
    guessedCardTracker: number;
    isRatingHidden?: boolean;
    OnClick?: (arg: 'more' | 'less') => void;

}

export const FilmCard: React.FC<FilmProp> = ({ film, transition, color }) => {
    return (
        <div style={color} className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>{film.name}</div>
            <div className={styles.filmcard_rating_wrapper}>
                <p className={styles.filmcard_rating_text}>Imdb Rating:</p>
                <div>
                    <p className={styles.filmcard_rating_number}>{film.rating}</p>
                </div>

            </div>
        </div>
    );
}

export const GuessCard: React.FC<FilmProp> = ({ film, color, filmIndex, isTransitioning, guessedCardTracker, isRatingHidden, OnClick }) => {
    return (
        <div style={color} className={isTransitioning ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={styles.filmcard_rating_wrapper}>
                <div className={styles.filmcard_rating_text}>Imdb Rating:</div>
                <div className={isRatingHidden && (filmIndex == guessedCardTracker) ? styles.display_none : ''}>
                    <Rating ratingNumber={film.rating} isHidden={isTransitioning || isRatingHidden} isGuessed={(filmIndex == guessedCardTracker)} />
                </div>
            </div>
            <div className={isRatingHidden && (filmIndex == guessedCardTracker) ? `${styles.buttons}` : `${styles.display_none} ${styles.buttons}`}>
                <MoreButton onClick={() => OnClick?.('more')} />
                <div className={styles.filler}></div>
                <LessButton onClick={() => OnClick?.('less')} />
            </div>
        </div>
    );
}

export const BlankCard: React.FC<FilmProp> = ({ film, transition, color }) => {
    return (
        <div style={color} className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={styles.filmcard_rating_wrapper}>
                <div className={styles.filmcard_rating_text}>Imdb Rating:</div>
            </div>
            <div className={`${styles.buttons}`}>
                <p className={styles.game_button_more}>More</p>
                <div className={styles.filler}></div>
                <p className={styles.game_button_less}>Less</p>
            </div>
        </div>
    );
}