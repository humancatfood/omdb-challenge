export const ACTIONS = {
  FETCH_FILM: 'FETCH_FILM',
  RECEIVE_FILM: 'RECEIVE_FILM',
  RECEIVE_FILMS: 'RECEIVE_FILMS',
  SEARCH_FILMS: 'SEARCH_FILMS',
  SET_SORT_PROP: 'SET_SORT_PROP'
};



export const setSortProp = (sortProp, reverse=false) => ({
  type: ACTIONS.SET_SORT_PROP,
  payload: {
    sortProp,
    reverse
  }
});


export const searchFilms = searchTerm => ({
  type: ACTIONS.SEARCH_FILMS,
  payload: {
    searchTerm
  }
});


export const receiveFilms = films => ({
  type: ACTIONS.RECEIVE_FILMS,
  payload: {
    films
  }
});


export const fetchFilm = id => ({
  type: ACTIONS.FETCH_FILM,
  payload: {
    id
  }
});


export const receiveFilm = film => ({
  type: ACTIONS.RECEIVE_FILM,
  payload: {
    film
  }
});
