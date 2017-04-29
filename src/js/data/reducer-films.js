import { ACTIONS } from './actions';



const initialState = {
  films: [],
  searchingFilms: false,
  searchTerm: null,
  selectedFilm: null,
  fetchingFilm: false
};


export default (state=initialState, action) => {

  switch (action.type)
  {

    case ACTIONS.SEARCH_FILMS:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        searchingFilms: true
      };

    case ACTIONS.RECEIVE_FILMS:
      return {
        ...state,
        films: action.payload.films,
        searchingFilms: false
      };

    case ACTIONS.FETCH_FILM:
      return {
        ...state,
        fetchingFilm: true,
        selectedFilm: null
      };

    case ACTIONS.RECEIVE_FILM:
      return {
        ...state,
        fetchingFilm: false,
        selectedFilm: action.payload.film
      };

    default:
      return state;

  }

};
