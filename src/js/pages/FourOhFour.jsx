import React from 'react';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilmList from '../components/FilmList';



export default ({ path }) => (
  <div className="container">
    <Header title="Four-Oh-Four"/>
    <p>
      Sorry, <mark>{ path }</mark> couldn't be found :'(
    </p>
  </div>
);
