import {
    SET_ADVERTS,
    LIKE_ADVERT,
    UNLIKE_ADVERT,
    LOADING_DATA,
    DELETE_ADVERT,
    POST_ADVERT,
    SET_ADVERT,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    posts: [],
    post: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_ADVERTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case SET_ADVERT:
      return {
        ...state,
        post: action.payload
      };
      case LIKE_ADVERT:
      case UNLIKE_ADVERT:
        let index = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        state.posts[index] = action.payload;
        if (state.post.postId === action.payload.postId) {
          let temp=state.post.comments;
          state.post = action.payload;
          state.post.comments=temp;
        }
        return {
          ...state
        };
        case DELETE_ADVERT:
          return {
            ...state,
            posts: state.posts.filter((post) => post.postId !== action.payload )
       };
       case POST_ADVERT:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
      default:
        return state;
    }
  }