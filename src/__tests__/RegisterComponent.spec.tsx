import * as React from 'react';
import { Register } from "../components/pages/register";
import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

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
            id: 1,
            name: "React",
          }
        ]
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [
            {
              user_id: 'test',
              name: 'test',
              description: 'test',
              github_id: 'test',
              qiita_id: 'test',
              x_id: 'test',
              error: null
            }
          ]
        })),
      })),
    })),
  })),
}));

describe("name", () => {
  it("should render name", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("title")).toHaveTextContent("名刺新規作成");
  });
});

describe("insert user", () => {
  it("should insert user", async() => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id"), "test");
    await userEvent.type(screen.getByTestId("name"), "test");
    await userEvent.type(screen.getByTestId("description"), "test");
    await userEvent.type(screen.getByTestId("github_id"), "test");
    await userEvent.type(screen.getByTestId("qiita_id"), "test");
    await userEvent.type(screen.getByTestId("x_id"), "test");
    await userEvent.selectOptions(screen.getByTestId("skill_id"), '1');
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });
})

describe("user_id_error", () => {
  it("should render user_id_error", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("name"), "test");
    await userEvent.type(screen.getByTestId("description"), "test");
    await userEvent.type(screen.getByTestId("github_id"), "test");
    await userEvent.type(screen.getByTestId("qiita_id"), "test");
    await userEvent.type(screen.getByTestId("x_id"), "test");
    await userEvent.selectOptions(screen.getByTestId("skill_id"), '1');
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(screen.getByTestId("user_id_error")).toHaveTextContent("IDの入力は必須です"));
  });
});

describe("name_error", () => {
  it("should render name_error", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id"), "test");
    await userEvent.type(screen.getByTestId("description"), "test");
    await userEvent.type(screen.getByTestId("github_id"), "test");
    await userEvent.type(screen.getByTestId("qiita_id"), "test");
    await userEvent.type(screen.getByTestId("x_id"), "test");
    await userEvent.selectOptions(screen.getByTestId("skill_id"), '1');
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(screen.getByTestId("name_error")).toHaveTextContent("お名前の入力は必須です"));
  });
});

describe("description_error", () => {
  it("should render description_error", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id"), "test");
    await userEvent.type(screen.getByTestId("name"), "test");
    await userEvent.type(screen.getByTestId("github_id"), "test");
    await userEvent.type(screen.getByTestId("qiita_id"), "test");
    await userEvent.type(screen.getByTestId("x_id"), "test");
    await userEvent.selectOptions(screen.getByTestId("skill_id"), '1');
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(screen.getByTestId("description_error")).toHaveTextContent("自己紹介の入力は必須です"));
  });
});

describe("skill_id_error", () => {
  it("should render skill_id_error", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id"), "test");
    await userEvent.type(screen.getByTestId("name"), "test");
    await userEvent.type(screen.getByTestId("description"), "test");
    await userEvent.type(screen.getByTestId("qiita_id"), "test");
    await userEvent.type(screen.getByTestId("github_id"), "test");
    await userEvent.type(screen.getByTestId("x_id"), "test");
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(screen.getByTestId("skill_id_error")).toHaveTextContent("好きな技術の入力は必須です"));
  });
});

describe("not_type_option", () => {
  it("should insert user", async() => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await userEvent.type(screen.getByTestId("user_id"), "test");
    await userEvent.type(screen.getByTestId("name"), "test");
    await userEvent.type(screen.getByTestId("description"), "test");
    await userEvent.selectOptions(screen.getByTestId("skill_id"), '1');
    await userEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });
});