import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_DISPLAY_PRODUCTS,
} from '../constants';

export default function ProductReducer(state = {
  products: [],
  pages: 0,
  display: [],
  error: '',
}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        ...{
          products: action.pageData.products,
          pages: action.pageData.pages,
        },
      };
    case GET_DISPLAY_PRODUCTS:
      return {
        ...state,
        ...{ display: action.products },
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };
    default:
      return state;
  }
}
