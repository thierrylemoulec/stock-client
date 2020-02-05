export const FETCH_STOCKS = "STOCKS/FETCH_STOCKS";
export const RESOLVE_STOCKS = "STOCKS/RESOLVE_STOCKS";
export const RESOLVE_ERROR = "STOCKS/RESOLVE_ERRORS";
export const TOGGLE_EDIT = "STOCKS/TOGGLE_EDIT";
export const ADD_CUSTOM_STOCK = "STOCKS/ADD_CUSTOM_STOCK";

export const fetchStocks = () => ({
  type: FETCH_STOCKS
});
export const resolveStocks = stocks => ({
  type: RESOLVE_STOCKS,
  payload: stocks
});
export const resolveError = error => ({
  type: RESOLVE_ERROR,
  payload: error
});

export const getStocks = () => async (dispatch, getState) => {
  try {
    if (getState().stocks.length === 0) {
      // Initial Loading
      dispatch(fetchStocks);
    }
    if (getState().editing) {
      // Don't fetch stocks if we are editing
      return false;
    }
    const url = "//127.0.0.1:8000?count=20";
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(resolveStocks(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(resolveError(error));
  }
};

export const toggleEdit = () => {
  return {
    type: TOGGLE_EDIT
  };
};
export const addCustomStock = customStock => {
  return {
    type: ADD_CUSTOM_STOCK,
    payload: customStock
  };
};
