import * as React from 'react';
import { Profile } from "../components/pages/profile";
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
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              user_id: "1",
              name: "test",
              description: "test",
              github_id: "test",
              qiita_id: "test",
              x_id: "test",
              user_skill: [
                {
                  skills: {
                    id: 1,
                    name: "test"
                  }
                }
              ]
            }
          }))
        })),
      })),
    })),
  })),
}));

describe("name", () => {
  it("should render name", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("name")).toHaveTextContent("test");
  });
});

describe("description", () => {
  it("should render description", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("description")).toHaveTextContent("test");
  });
});

describe("skill", () => {
  it("should render skill", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("skill")).toHaveTextContent("test");
  });
});

describe("github_icon", () => {
  it("should render github_icon", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
  });
});

describe("qiita_icon", () => {
  it("should render qiita_icon", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("qiita-icon")).toBeInTheDocument();
  });
});

describe("x_icon", () => {
  it("should render x_icon", async() => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });
});

describe("root_return_button_click", () => {
  it("should navigate to root", async() => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:user_id" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const button = screen.getByTestId("root-return-button");
    userEvent.click(button);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });
});