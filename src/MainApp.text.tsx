import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./MainApp";

test("renders learn react link", () => {
  render(<App />);
  const pElement = screen.getByText(/hello world/i);
  expect(pElement).toBeInTheDocument();
});
