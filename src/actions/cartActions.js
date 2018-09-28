
import axios from 'axios';
import {
  GET_CART,
  UPDATE_CART,
  ADD_TO_CART,
  DELETE_CART_ITEM,
} from '../constants';

export function getCart(callback) {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/cart');
      dispatch({ type: GET_CART, items: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      throw (err);
    }
  };
}

export function updateCartItem(item, callback) { // update a simgle item
  return async (dispatch) => {
    try {
      const response = await axios.put('/api/cart', item);
      dispatch({ type: UPDATE_CART, items: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      throw (err);
    }
  };
}

export function saveCartItem(item, callback) { // update a simgle item
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/cart', item);
      dispatch({ type: ADD_TO_CART, items: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      throw (err);
    }
  };
}


export function deleteCartItem(item, callback) { // update a simgle item
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/cart/${item.product._id}`, item);
      dispatch({ type: DELETE_CART_ITEM, items: response.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      throw (err);
    }
  };
}
