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
    isHidden?: boolean;
    OnClick?: (arg: 'more' | 'less') => void;

}

export const FilmCard: React.FC<FilmProp> = ({ film, transition, color }) => {
    return (
        <div style={color} className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={styles.filmcard_rating_wrapper}>
                <p className={styles.filmcard_rating_text}>Imdb Rating:</p>
                <div>
                    <p className={styles.filmcard_rating_number}>{film.rating}</p>
                </div>

            </div>
            <div className={styles.filler_buttons}></div>
        </div>
    );
}

export const GuessCard: React.FC<FilmProp> = ({ film, transition, color, isHidden, OnClick }) => {
    return (
        <div style={color} className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={isHidden ? `${styles.filmcard_rating_wrapper} ${styles.display_none}` : `${styles.filmcard_rating_wrapper}`}>
                <p className={styles.filmcard_rating_text}>Imdb Rating:</p>
                <div>
                    <Rating ratingNumber={film.rating} isHidden={isHidden} />
                </div>

            </div>
            <div className={!isHidden ? `${styles.display_none} ${styles.buttons}` : `${styles.buttons}`}>
                <MoreButton onClick={() => OnClick?.('more')} />
                <div className={styles.filler}></div>
                <LessButton onClick={() => OnClick?.('less')} />
            </div>
            <div className={styles.filler_buttons}></div>
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
            <div className={`${styles.buttons}`}>
                <p className={styles.game_button_more}>More</p>
                <div className={styles.filler}></div>
                <p className={styles.game_button_less}>Less</p>
            </div>
            <div className={styles.filler_buttons}></div>
        </div>
    );
}