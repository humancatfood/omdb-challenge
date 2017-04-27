import { ACTIONS } from './actions';



const initialState = {
  sortProp: 'TITLE',
  reverse: false
};


export default (state=initialState, action) => {

  switch (action.type)
  {

    case ACTIONS.SET_SORT_PROP:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;

  }

};
