import {combineReducers} from 'redux';
import postsList from './tasks';
import logIn from './login';


const rootReducer = combineReducers({
  logIn,
  postsList
});

export default rootReducer;