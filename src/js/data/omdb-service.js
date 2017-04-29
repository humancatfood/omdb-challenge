import { get } from 'axios';



export const getFilmList = searchTerm => {

  return get(`http://www.omdbapi.com/?s=${ searchterm }`)
    .then(response => response.data && response.data.Search || []);

};

export const getFilm = filmId => {

  return get(`http://www.omdbapi.com/?i=${ filmId }&plot=full`)
      .then(response => response.data);

};
