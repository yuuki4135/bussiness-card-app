import * as React from 'react';
import App from "../App";
import '@testing-library/jest-dom';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    // testId(title)を指定して取得
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});