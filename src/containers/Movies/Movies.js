import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Movies.css'

import SearchMovies from '../../components/searchMovies/SearchMovies'
import Movie from '../../components/Movie/Movie'
import MovieInfo from '../../components/MovieInfo/MovieInfo'

const Movies = () => {
    const [movies, moviesHandler] = useState([]);
    const [searchMovies, searchMoviesHandler] = useState("");
    const [foundMovies, foundMoviesHandler] = useState("");
    const [bestMovies, bestMoviesHandler] = useState([]);
    const [infoMovie, infoMovieHandler] = useState({
        showInfo: false,
        movie: null
    })

    useEffect(() => {
        if (searchMovies) {
            axios.get(`http://www.omdbapi.com/?s=${searchMovies}&page=1&apikey=abfce362`)
                .then(res => {
                    console.log(res)
                    moviesHandler(res.data.Search);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [foundMovies]);

    const searchMoviesTitle = (event) => {
        searchMoviesHandler(event.target.value);
        console.log(searchMovies)
    }

    const found = (searchMovies) => {
        foundMoviesHandler(searchMovies);
    }

    const info = (id) => {
        let movie = movies.filter(mov => {
            return mov.imdbID === id;
        })
        movie = movie[0];
        // console.log(movie);
        infoMovieHandler({
            showInfo: true,
            movie: movie
        });
    }

    const closeInfo = () => {
        infoMovieHandler({
            showInfo: false,
            movie: null
        });
    }

    return (
        <div className="Movies">
            <div className="Search">
                <SearchMovies change={searchMoviesTitle} clicked={found} />
            </div>
            <div className="AllMovies">
                {
                    movies.length > 0 ? movies.map(movie => {
                        if (movie.Poster) {
                            return <Movie
                                title={movie.Title}
                                img={movie.Poster}
                                key={movie.imdbID}
                                id={movie.imdbID}
                                info={info} />
                        }
                        return null;
                    }
                    ) : <h1 className="searchForMovies">
                        Search for movies...
                    </h1>}
            </div>
            {infoMovie.showInfo ? <MovieInfo id={infoMovie.movie.imdbID} closeInfo={closeInfo} show={infoMovie.showInfo} /> : null}
        </div>
    );
}
export default Movies;
