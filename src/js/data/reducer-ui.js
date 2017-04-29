import { ACTIONS } from './actions';



const initialState = {
  sortProp: 'Title',
  reverse: false
};


export default (state=initialState, action) => {

  switch (action.type)
  {

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
