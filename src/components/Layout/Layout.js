import React from 'react';

import './Layout.css'

import Movies from '../../containers/Movies/Movies'

const Layout = () => {
    return (
        <div className="Layout">
            <h1 className="moviedb">Movie database</h1>
            <Movies />
        </div>
    );
}

export default Layout;
