import React from 'react';

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
        <div className={(transition ? "film-card slide-anim" : "film-card") + " margin-right-filler"}>
            <div className='film-name-wrapper'>
                <h2>{film.name}</h2>
            </div>
            <img className='film-logo' src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className='rating-text-wrapper'>
                <p className='no-margin'>Imdb Rating:</p>
                <p className='rating-text'>{film.rating}</p>
            </div>
        </div>
    );
}

export const GuessCard: React.FC<FilmProp> = ({ film, transition, isHidden }) => {
    return (
        <div className={transition ? "film-card slide-anim" : "film-card"}>
            <div className='film-name-wrapper'>
                <h2>{film.name}</h2>
            </div>
            <img className='film-logo' src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className='rating-text-wrapper'>
                <p className='no-margin'>Imdb Rating:</p>
                <p className='rating-text'>{isHidden ? "???" : film.rating}</p>
            </div>
        </div>
    );
}

export const BlankCard: React.FC<FilmProp> = ({ film, transition }) => {

    return (
        <div className={(transition ? "film-card slide-anim" : "film-card") + " margin-left-filler"}>
            <div className='film-name-wrapper'>
                <h2>{film.name}</h2>
            </div>
            <img className='film-logo' src={film.logo} alt={film.name} height={300} width={200}></img>
            <div className='rating-text-wrapper'>
                <p className='no-margin'>Imdb Rating:</p>
                <div className='hidden'>
                    <p className='rating-text'>???</p>
                </div>
            </div>
        </div>
    );
}