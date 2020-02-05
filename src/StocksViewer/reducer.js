import {
  ADD_CUSTOM_STOCK,
  FETCH_STOCKS,
  TOGGLE_EDIT,
  RESOLVE_STOCKS,
  RESOLVE_ERROR
} from "./actions";

export const initialState = {
  stocks: [],
  loading: true,
  editing: false,
  editedStocks: [],
  error: null
};

export default function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STOCKS:
      return {
        ...state,
        loading: true
      };
    case RESOLVE_STOCKS:
      return {
        ...state,
        stocks: action.payload,
        error: null,
        loading: false
      };
    case RESOLVE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        editing: !state.editing
      };
    case ADD_CUSTOM_STOCK:
      return {
        ...state,
        editing: false,
        editedStocks: [...state.editedStocks, action.payload]
      };
    default:
      return state;
  }
}
