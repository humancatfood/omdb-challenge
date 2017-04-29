import { get } from 'axios';

import throttle from 'lodash/throttle';


export const getFilmList = throttle(searchTerm => {

  return get(`http://www.omdbapi.com/?s=${ searchTerm }`)
    .then(response => response.data && response.data.Search || []);

}, 1000);

export const getFilm = throttle(filmId => {

  return get(`http://www.omdbapi.com/?i=${ filmId }&plot=full`)
    .then(response => response.data.Error ? null : response.data);

}, 1000);
