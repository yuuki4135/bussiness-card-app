import * as React from 'react';
import { Top } from "../components/pages/top";
import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Router, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [
          {
            user_id: "1",
            name: "test",
            description: "test",
            github_id: "test",
            qiita_id: "test",
            x_id: "test"
          }
        ]
      })),
    })),
  })),
}));

describe("title", () => {
  it("should render title", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Top />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("title")).toHaveTextContent("デジタル名刺アプリ");
  });
});

describe("type_user_id", () => {
  it("should navigate to profile", async() => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Top />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id_input"), "1");
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/card/1");
    });
  });
});

describe("not_type_user_id", () => {
  it("should render error", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Top />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error")).toHaveTextContent("IDが見つかりません");
  });
});

describe("register_button_click", () => {
  it("should navigate to register", async() => {
    const history = createMemoryHistory();
    history.push = jest.fn()

    await act(async() => {
      render(
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<Top />} />
          </Routes>
        </Router>
      );
    });
    const button = screen.getByTestId("register-button");
    await userEvent.click(button);
    await waitFor(() => {
      expect(history.push).toHaveBeenCalledWith(
        {"hash": "", "pathname": "/card/register", "search": ""}, undefined, expect.any(Object)
      );
    });
  });
});