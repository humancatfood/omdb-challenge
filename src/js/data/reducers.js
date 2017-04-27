import { combineReducers } from 'redux';
import films from './reducer-films';
import ui from './reducer-ui';



export default combineReducers({
  films,
  ui
});
