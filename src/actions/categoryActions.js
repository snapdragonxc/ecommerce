import Axios from 'axios';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
} from '../constants';

export function getCategories(cached = false, callback) {
  return async (dispatch) => {
    try {
      const url = '/api/categories';
      if (!cached) {
        const response = await Axios.get(url);
        dispatch({ type: GET_CATEGORIES, categories: response.data });
        sessionStorage.removeItem(url);
        if (callback) {
          callback();
        }
      } else {
        const data = JSON.parse(sessionStorage.getItem(url));
        if (!data) {
          const response = await Axios.get('/api/categories');
          dispatch({ type: GET_CATEGORIES, categories: response.data });
          sessionStorage.setItem(url, JSON.stringify(response.data));
          if (callback) {
            callback();
          }
        } else {
          dispatch({ type: GET_CATEGORIES, categories: data });
          if (callback) {
            callback(data);
          }
        }
      }
    } catch (err) {
      dispatch({ type: CATEGORY_ERROR, error: err });
    }
  };
}

export function addCategory(name, callback) {
  return async (dispatch) => {
    try {
      const response = await Axios.post('/api/categories', { name });
      dispatch({ type: ADD_CATEGORY, category: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({ type: CATEGORY_ERROR, error: err.response.data });
    }
  };
}

export function deleteCategory(id, callback) {
  return async (dispatch) => {
    try {
      const response = await Axios.delete(`/api/categories/${id}`);
      dispatch({ type: DELETE_CATEGORY, _id: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({ type: CATEGORY_ERROR, error: err.response.data });
    }
  };
}
