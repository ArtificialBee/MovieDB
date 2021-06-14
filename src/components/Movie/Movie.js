import React from 'react';


import './Movie.css'

const Movie = (props) => {
    const id = props.id;
    return (
        <div className="Movie" onClick={() => props.info(id)}>
            <h3>{props.title}</h3>
            <img src={props.img} alt="movie img" />
        </div >
    );
}

export default Movie;
