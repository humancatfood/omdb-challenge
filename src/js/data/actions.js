export const ACTIONS = {

  SET_SORT_PROP: 'SET_SORT_PROP'

};



export const setSortProp = (sortProp, reverse=false) => ({
  type: ACTIONS.SET_SORT_PROP,
  payload: {
    sortProp,
    reverse
  }
});
