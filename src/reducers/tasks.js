import {LOAD_POSTS} from '../constants';

const initialState = {
  tasks: [],
  isLoading: true
};

const postsList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        tasks: action.postsList,
        isLoading: false
      };
    default:
      return state;
  }
};

export default postsList;