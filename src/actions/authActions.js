import Axios from 'axios';
import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants';

export function loginUser(username, password) {
  return async (dispatch) => {
    try {
      const response = await Axios.post('/api/users/login', { username, password });
      dispatch({ type: LOGIN, username: response.data.username });
    } catch (err) {
      dispatch({ type: LOGIN_ERROR, username: '' });
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    Axios.get('/api/users/logout')
      .then(() => {
        dispatch({ type: LOGOUT, username: '' });
      })
      .catch((err) => {
        throw (err);
      });
  };
}
