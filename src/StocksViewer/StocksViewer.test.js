import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { EditableStockPrice } from "./StocksTable";
import StocksViewer from "./index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import stocksReducer from "./reducer";

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(stocksReducer, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

const mock = {
  stocks: [
    {
      timestamp: 1580831570158,
      index: 6701,
      stocks: { NASDAQ: 20.8337959782371024, CAC40: 17.667091447234001 }
    },
    {
      timestamp: 1580831570157,
      index: 6700,
      stocks: { NASDAQ: 1.8337959782371024e-112, CAC40: 7.667091447234001e-98 }
    }
  ]
};

test("renders price cell with rounded number", () => {
  const { getByText } = renderWithRedux(
    <EditableStockPrice stock={mock.stocks[0]} type="NASDAQ" />
  );
  expect(getByText(/20.83/i)).toBeInTheDocument();
});

test("renders price cell with '####' if NaN", () => {
  const { getByText } = renderWithRedux(
    <EditableStockPrice stock={mock.stocks[1]} type="NASDAQ" />
  );
  expect(getByText(/####/i)).toBeInTheDocument();
});

test("Can edit price cell", () => {
  const { getByText, getByDisplayValue, getByTestId, store } = renderWithRedux(
    <EditableStockPrice stock={mock.stocks[0]} type="NASDAQ" />
  );
  fireEvent.click(getByText(/20.83/i));
  fireEvent.change(getByDisplayValue("20.83"), { target: { value: 100.22 } });
  fireEvent.submit(getByTestId("form-cell"));
  expect(getByText(/100.22/i)).toBeInTheDocument();
  expect(store.getState().editedStocks[0].stocks.NASDAQ).toBe(100.22);
});

const initialStoreMerged = {
  stocks: [
    {
      timestamp: 1580831570158,
      index: 6701,
      stocks: { NASDAQ: 20.8337959782371024, CAC40: 17.667091447234001 }
    },
    {
      timestamp: 1580831570157,
      index: 6700,
      stocks: { NASDAQ: 1.8337959782371024e-112, CAC40: 7.667091447234001e-98 }
    },
    {
      timestamp: 1580831570156,
      index: 6699,
      stocks: { NASDAQ: 1.7337959782371024e-112, CAC40: 8.667091447234001e-98 }
    }
  ],
  loading: false,
  editing: false,
  editedStocks: [
    {
      timestamp: 1580831570158,
      index: 6701,
      stocks: { NASDAQ: 100.22, CAC40: 17.667091447234001 }
    }
  ],
  error: null
};

test("Edited Stocks and stocks should be merged correctly", () => {
  const { getByText, queryByText } = renderWithRedux(<StocksViewer />, {
    initialState: initialStoreMerged
  });
  expect(getByText(/100.22/i)).toBeInTheDocument();
  expect(queryByText(/20.83/i)).not.toBeInTheDocument();
});
