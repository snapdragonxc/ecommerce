import { LOGIN, LOGOUT, LOGIN_ERROR } from '../constants';

export default function (state = { username: '' }, action) {
  switch (action.type) {
    case LOGIN:
      return { username: action.username };
    case LOGOUT:
      return { username: '' };
    case LOGIN_ERROR:
      return { username: '' };
    default:
      return state;
  }
}
