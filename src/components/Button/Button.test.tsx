import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

let container = null as any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button>Button</Button>);
    expect(screen.getByText('Button').classList.contains('pc__btn')).toBe(true);
  });
});

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
})