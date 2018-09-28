import Axios from 'axios';

import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_DISPLAY_PRODUCTS,
} from '../constants';

export function getProducts(category = 'all-items', page = 1, callback) {
  // this is cached
  return async (dispatch) => {
    try {
      const url = `/api/products/${category}/${page}`;
      const data = JSON.parse(sessionStorage.getItem(url));
      if (!data) {
        const response = await Axios.get(url);
        dispatch({ type: GET_PRODUCTS, pageData: response.data });
        sessionStorage.setItem(url, JSON.stringify(response.data));
        if (callback) {
          callback();
        }
      } else {
        dispatch({ type: GET_PRODUCTS, pageData: data });
        if (callback) {
          callback();
        }
      }
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, error: err });
    }
  };
}

export function getDisplayProducts() {
  return async (dispatch) => {
    try {
      const response = await Axios.get('/api/products/display');
      dispatch({ type: GET_DISPLAY_PRODUCTS, products: response.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, error: err });
    }
  };
}
