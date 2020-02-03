import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Stocks Views", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Stocks Viewer/i);
  expect(titleElement).toBeInTheDocument();
});
