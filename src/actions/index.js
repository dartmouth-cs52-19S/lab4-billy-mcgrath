import axios from 'axios';

const ROOT_URL = 'https://billy-lab5.herokuapp.com/api';
// export const ROOT_URL = 'http://localhost:9090/api';
// const API_KEY = '?key=b_mcgrath';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};


// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}


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
  axios.post(`${ROOT_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      history.push('/');
    }).catch((error) => {
      // whaaat?
      // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
      // have an error component somewhere show it
      authError(`Not authorized: ${error.response.data}`);
      // might you also want an ERROR_CLEAR action?
    });
}

export function updatePost(id, post) {
  const fields = {
    title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  };

  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch(authError(`Not authorized: ${error.response.data}`));
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
        dispatch(authError(`Not authorized: ${error.response.data}`));
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
      // whaaat?
      // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
      // have an error component somewhere show it
        dispatch(authError(`Not authorized: ${error.response.data}`));
      // might you also want an ERROR_CLEAR action?
      });
  };
}

export function signinUser({ email, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  console.log({ email, password });
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
        // might you also want an ERROR_CLEAR action?
      });
  };
}


export function signupUser({ username, email, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  console.log({ email, password });
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { username, email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
        // might you also want an ERROR_CLEAR action?
      });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
