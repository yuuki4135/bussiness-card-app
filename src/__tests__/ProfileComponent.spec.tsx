import * as React from 'react';
import { Profile } from "../components/pages/profile";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe("Profile Test", () => {
  it("名前が表示されている", () => {
    render(<Profile />);
    const title = screen.getByTestId("profile");
    expect(title).toHaveTextContent("プロフィール");
  });
});