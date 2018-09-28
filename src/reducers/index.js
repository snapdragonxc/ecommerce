import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
});
