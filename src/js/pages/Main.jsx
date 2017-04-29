import React from 'react';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilmList from '../components/FilmList';



export default () => (
  <div className="container">
    <Header title="Film Search"/>
    <SearchBar />
    <FilmList />
  </div>
);
