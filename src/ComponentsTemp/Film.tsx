import React from 'react';
import styles from '../Style.module.scss';
import { MoreButton, LessButton } from './PlayerButtons';
export type Film = {
    name: string;
    rating: number;
    logo: string;
}

type FilmProp = {
    film: Film;
    transition: boolean;
    isHidden?: boolean;
    OnClick?: (arg: 'more' | 'less') => void;
}

export const FilmCard: React.FC<FilmProp> = ({ film, transition }) => {

    return (
        <div className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
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

export const GuessCard: React.FC<FilmProp> = ({ film, transition, isHidden, OnClick }) => {
    return (
        <div className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={styles.filmcard_rating_wrapper}>
                <p className={styles.filmcard_rating_text}>Imdb Rating:</p>
                <div>
                    <p className={styles.filmcard_rating_number}>{isHidden ? "???" : film.rating}</p>
                </div>

            </div>
            <div className={transition ? `${styles.buttons} ${styles.hidden}` : `${styles.buttons}`}>
                <MoreButton onClick={() => OnClick?.('more')} />
                <div className={styles.filler}></div>
                <LessButton onClick={() => OnClick?.('less')} />
            </div>
        </div>
    );
}

export const BlankCard: React.FC<FilmProp> = ({ film, transition }) => {

    return (
        <div className={transition ? `${styles.filmcard} ${styles.anim_slide}` : `${styles.filmcard}`}>
            <img className={styles.filmcard_poster} src={film.logo} alt={film.name}></img>
            <div className={styles.filmcard_title_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <div className={styles.filmcard_rating_wrapper}>
                <p className={styles.filmcard_rating_text}>Imdb Rating:</p>
                <div>
                    <p className={styles.filmcard_rating_number}>???</p>
                </div>
            </div>
            <div className={styles.filler_buttons}></div>
        </div>
    );
}