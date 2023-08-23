import React from 'react';

export type Film = {
    name: string;
    rating: number;
    logo: string;
}

type FilmProp = {
    film: Film;
    isHidden?: boolean;
    message?: string;
}

export const FilmCard: React.FC<FilmProp> = ({ film }) => {

    return (
        <div className="film-card">
            <h2>{film.name}</h2>
            <img src={film.logo} alt={film.name} height={300} width={200}></img>
            <p>Raiting: {film.rating}</p>
        </div>
    );
}

export const GuessCard: React.FC<FilmProp> = ({ film, isHidden, message }) => {
    return (
        <div className="film-card">
            <h2>{film.name}</h2>
            <img src={film.logo} alt={film.name} height={300} width={200}></img>
            <p>{isHidden ? "" : `${message}\nRaiting: ${film.rating}`}</p>
        </div>
    );
}