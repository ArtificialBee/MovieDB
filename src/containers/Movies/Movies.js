import React, { useState } from 'react';
import SearchMovies from '../../components/searchMovies/SearchMovies'
import Movie from '../../components/Movie/Movie'

const Movies = () => {
    const [movies, moviesHandler] = useState();
    return (
        <div>
            <p>Search for movies</p>
            <p>All movies</p>
            <p>Favourite movies</p>
            <p>top 5 movies</p>
        </div>
    );
}

export default Movies;
