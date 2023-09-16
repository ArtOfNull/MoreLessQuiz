import React from 'react';
import styles from '../App.module.scss';

export type Film = {
    name: string;
    rating: number;
    logo: string;
}

type FilmProp = {
    film: Film;
    transition: boolean;
    isHidden?: boolean;
}

export const FilmCard: React.FC<FilmProp> = ({ film, transition }) => {

    return (
        <div className={transition ? `${styles.film_card} ${styles.anim_slide_left}` : `${styles.film_card}`}>
            <div className={styles.film_name_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <img className={styles.film_logo} src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className={styles.rating_text_wrapper}>
                <p className={styles.rating_text}>Imdb Rating:</p>
                <p className={styles.rating_text_number}>{film.rating}</p>
            </div>
        </div>
    );
}

export const GuessCard: React.FC<FilmProp> = ({ film, transition, isHidden }) => {
    return (
        <div className={transition ? `${styles.film_card} ${styles.anim_slide_left}` : `${styles.film_card}`}>
            <div className={styles.film_name_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <img className={styles.film_logo} src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className={styles.rating_text_wrapper}>
                <p className={styles.rating_text}>Imdb Rating:</p>
                <p className={styles.rating_text_number}>{isHidden ? "???" : film.rating}</p>
            </div>
        </div>
    );
}

export const BlankCard: React.FC<FilmProp> = ({ film, transition }) => {

    return (
        <div className={transition ? `${styles.film_card_blank} ${styles.anim_slide_left}` : `${styles.film_card_blank}`}>
            <div className={styles.film_name_wrapper}>
                <h2>{film.name}</h2>
            </div>
            <img className={styles.film_logo} src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className={styles.rating_text_wrapper}>
                <p className={styles.rating_text}>Imdb Rating:</p>
                <p className={styles.rating_text_number}>???</p>
            </div>
        </div>
    );
}