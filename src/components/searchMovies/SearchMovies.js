import React from 'react';

import './SearchMovies.css'
import { BsSearch } from 'react-icons/bs'

const SearchMovies = (props) => {

    return (
        <div className="SearchMovies">
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => props.change(event)}
                value={props.value}
                className="srcInput" />
            <BsSearch
                onClick={props.clicked}
                className="srcBtn"
                size="20"
                cursor="pointer"
                color="white" />
        </div>
    );
}

export default SearchMovies;
