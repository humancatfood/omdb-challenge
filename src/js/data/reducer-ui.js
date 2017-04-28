import { ACTIONS } from './actions';



const initialState = {
  searchingFilms: false,
  searchTerm: null,
  sortProp: 'Title',
  reverse: false
};


export default (state=initialState, action) => {

  switch (action.type)
  {

    case ACTIONS.SEARCH_FILMS:
      return {
        ...state,
        searchingFilms: true,
        searchTerm: action.payload.searchTerm
      };

    case ACTIONS.RECEIVE_FILMS:
      return {
        ...state,
        searchingFilms: false,
        searchTerm: null
      };

    case ACTIONS.SET_SORT_PROP:
      return {
        ...state,
        sortProp: action.payload.sortProp,
        reverse: action.payload.reverse
      };

    default:
      return state;

  }

};
