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

    default:
      return state;

  }

};
