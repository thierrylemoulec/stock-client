import React from "react";
import StocksViewer from "./StocksViewer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import stocksReducer from "./StocksViewer/reducer";
import { ThemeProvider } from "styled-components";
import { theme } from "./StocksViewer/utils";

const enhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(stocksReducer, enhancer);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StocksViewer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
