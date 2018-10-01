import {
  GET_CART,
  UPDATE_CART,
  CART_ERROR,
  ADD_TO_CART,
  DELETE_CART_ITEM,
  DELETE_CART_ALL,
} from '../constants';

const totalAmount = arr => arr.map(item => Number(item.subTotal))
  .reduce((a, b) => (a + b), 0)
  .toFixed(2);

const totalQty = arr => arr.map(item => Number(item.qty))
  .reduce((a, b) => (a + b), 0);

export default function cartReducer(state = {
  items: [],
  total: 0,
  numberItems: 0,
}, action) {
  switch (action.type) {
    case GET_CART:
    case UPDATE_CART:
    case ADD_TO_CART:
    case DELETE_CART_ITEM:
      return {
        ...state,
        items: action.items,
        total: totalAmount(action.items),
        numberItems: totalQty(action.items),
      };
    case DELETE_CART_ALL:
      return {
        ...state,
        items: [],
        total: 0,
        numberItems: 0,
      };
    case CART_ERROR:
      return {
        ...state,
        ...{ error: action.payload },
      };
    default:
      return state;
  }
}
