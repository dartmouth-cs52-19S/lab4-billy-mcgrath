import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=b_mcgrath';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};


export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function createPost(post, history) {
  const fields = {
    title: post.title, content: post.content, cover_url: post.cover_url, tags: post.tags,
  };
  axios.post(`${ROOT_URL}/posts`, fields)
    .then((response) => {
      history.push('/');
    });
}

export function updatePost(id, post) {
  const fields = {
    title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  };

  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, fields)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
      // whaaat?
      // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
      // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
      // might you also want an ERROR_CLEAR action?
      });
  };
}
