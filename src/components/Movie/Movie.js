import React from 'react';

import { AiFillStar } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'

import './Movie.css'

const Movie = (props) => {
    const id = props.id;
    return (
        <div className="Movie" onClick={() => props.info(id)}>
            <h3>{props.title}</h3>
            <img src={props.img} />
        </div >
    );
}

export default Movie;
