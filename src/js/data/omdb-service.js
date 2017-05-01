import { get } from 'axios';



export const getFilmList = searchTerm => {

  return get(`https://www.omdbapi.com/?s=${ searchTerm }`)
    .then(response => response.data && response.data.Search || []);

};

export const getFilm = filmId => {

  return get(`https://www.omdbapi.com/?i=${ filmId }&plot=full`)
    .then(response => response.data.Error ? null : response.data);

};
