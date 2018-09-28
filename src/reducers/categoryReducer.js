import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
} from '../constants';

const CategoryReducer = (state = {
  categories: [],
  fetchCategories: false,
  error: '',
}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        ...{ categories: state.categories.concat(action.category) },
      };
    case GET_CATEGORIES:
      return {
        ...state,
        ...{ categories: action.categories, fetchCategories: !state.fetchCategories },
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        ...{ categories: state.categories.filter(({ _id }) => _id !== action._id) },
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        ...{ categories: action.error },
      };
    default:
      return state;
  }
};
export default CategoryReducer;
