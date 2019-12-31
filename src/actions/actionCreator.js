import {LOAD_POSTS, LOGIN} from '../constants';

export const loadPosts = (postsList) => {
  return {
    type: LOAD_POSTS,
    postsList
  }
};

export const logIn = (isLogIn) => {
  return {
    type: LOGIN,
    isLogIn
  }
};