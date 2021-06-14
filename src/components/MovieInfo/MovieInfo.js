import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'

import './MovieInfo.css'
import { IconContext } from 'react-icons';

const MovieInfo = (props) => {

    const [movie, movieHandler] = useState({});

    let btnClass = ["info "];

    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?i=${props.id}&plot=full&apikey=abfce362`)
            .then(res => {
                movieHandler(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        if (props.show) {
            btnClass = btnClass.push("openInfo");
        }
        else {
            btnClass = btnClass.push("closeInfo");
        }
    }, [props.show]);


    return (
        <div className="info openInfo">
            <IconContext.Provider value={{
                className: "closeButton"
            }}>
                <AiOutlineClose onClick={props.closeInfo} />
            </IconContext.Provider>

            <h1 className="title">{movie.Title}</h1>
            <div className="intro">
                <div className="img-rating">
                    <img src={movie.Poster} alt="poster" />
                    <p>Rating: {movie.imdbRating}</p>
                </div>
                <div className="about">
                    <p>Type: <span>{movie.Type}</span></p>
                    <p>Genre: <span>{movie.Genre}</span></p>
                    <p>Year: <span>{movie.Year}</span></p>
                    <p>Runtime: <span>{movie.Runtime}</span></p>
                    <p>Writer: <span>{movie.Writer}</span></p>
                    <p>Production: <span>{movie.Production}</span></p>
                    <p>Actors: <span>{movie.Actors}</span></p>
                    <p>Awards :<span>{movie.Awards}</span></p>
                </div>
            </div>
            <div className="plot">
                <p className="plotName">Plot: </p>
                <p className="plotCont">{movie.Plot}</p>
            </div>
        </div>
    );
}

export default MovieInfo;
