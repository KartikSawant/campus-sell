import {
    SET_ADVERTS,
    LOADING_DATA,
    LIKE_ADVERT,
    UNLIKE_ADVERT,
    DELETE_ADVERT,
    SET_ERRORS,
    POST_ADVERT,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_ADVERT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all posts
  export const getAdverts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/posts')
      .then((res) => {
        dispatch({
          type: SET_ADVERTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ADVERTS,
          payload: []
        });
      });
  };
  
  // Like a post
  export const likeAdvert = (postId) => (dispatch) => {
    axios
      .get(`/post/${postId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_ADVERT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a post
  export const unlikeAdvert = (postId) => (dispatch) => {
    axios
      .get(`/post/${postId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_ADVERT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const deleteAdvert = (postId) => (dispatch) => {
    axios
      .delete(`/post/${postId}`)
      .then(() => {
        dispatch({ type: DELETE_ADVERT, payload: postId });
      })
      .catch((err) => console.log(err));
  };
  export const postAdvert = (newAdvert) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/post', newAdvert)
      .then((res) => {
        dispatch({
          type: POST_ADVERT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const getAdvert = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/post/${postId}`)
      .then((res) => {
        dispatch({
          type: SET_ADVERT,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  export const submitComment = (postId, commentData) => (dispatch) => {
    axios
      .post(`/post/${postId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_ADVERTS,
          payload: res.data.posts
        });
      })
      .catch(() => {
        dispatch({
          type: SET_ADVERTS,
          payload: null
        });
      });
  };
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };