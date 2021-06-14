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
    const [infoMovie, infoMovieHandler] = useState({
        showInfo: false,
        movie: null
    });
    const [favMovies, favMoviesHandler] = useState({
        showFav: false,
        favourite: []
    });

    useEffect(() => {
        if (foundMovies) {
            axios.get(`http://www.omdbapi.com/?s=${foundMovies}&page=1&apikey=abfce362`)
                .then(res => {
                    moviesHandler(res.data.Search);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [foundMovies]);

    useEffect(() => {
        const memory = JSON.parse(localStorage.getItem("favMovies"));
        if (memory !== null) {
            favMoviesHandler({ showFav: true, favourite: memory });
        }
    }, [])

    const searchMoviesTitle = (event) => {
        searchMoviesHandler(event.target.value);
    }

    const found = () => {
        foundMoviesHandler(searchMovies);
    }

    const info = (id) => {
        console.log("POZVALA SE INFO")
        console.log(id)
        let movie = movies.filter(mov => {
            return mov.imdbID === id;
        })
        movie = movie[0];
        console.log(movie);
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

    const addToFavourite = (id) => {
        let newFavourite = movies.filter(movie => { //Izdvajamo film koji smo otvorili
            return movie.imdbID === id;
        })[0];
        let mem = JSON.parse(localStorage.getItem("favMovies")); //Povlacimo podatke iz localStorage
        if (!mem) { //Ukoliko trenutno u localStorage ne postoji favMovies
            mem = [newFavourite];
        }
        else {  //Ukoliko postoji, dodaj novi film na pocetak niza
            if (!mem.filter(movie => {
                return movie.imdbID === id;
            })[0]) {
                mem.unshift(newFavourite);
            }
        }
        if (mem.length > 5) { //Ukoliko imamo vise od 5 filmova, skini posljednji sa liste
            mem.pop();
        }
        localStorage.setItem("favMovies", JSON.stringify(mem));
        favMoviesHandler({ showFav: true, favourite: mem });
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
            <div className="favourite">
                <h1 className="fav-h1">Favourite movies:</h1>
                <div className="fav-movies">
                    {favMovies.favourite.map(movie => {
                        return <Movie title={movie.Title}
                            img={movie.Poster}
                            key={movie.imdbID}
                            id={movie.imdbID}
                            info={info} />
                    })}
                </div>
            </div>
            {infoMovie.showInfo ? <MovieInfo id={infoMovie.movie.imdbID} closeInfo={closeInfo} show={infoMovie.showInfo} click={addToFavourite} /> : null}

        </div>
    );
}
export default Movies;
