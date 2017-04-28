import { ACTIONS } from './actions';



const initialState = {
  films: [],
  selectedFilm: null
};


export default (state=initialState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_FILMS:
      return {
        ...state,
        films: action.payload.films,
        selectedFilm: null
      };

    case ACTIONS.SELECT_FILM:
      return {
        ...state,
        selectedFilm: action.payload.film
      };

    default:
      return state;

  }

};
