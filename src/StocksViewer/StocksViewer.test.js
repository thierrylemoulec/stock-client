import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { EditableStockPrice } from "./StocksTable";
import { createStore } from "redux";
import { Provider } from "react-redux";
import stocksReducer from "./reducer";

function renderWithRedux(
  ui,
  { initialState, store = createStore(stocksReducer, initialState) } = {}
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
