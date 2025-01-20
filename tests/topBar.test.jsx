import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import TopBar from "../src/components/TopBar";

const TestComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/home/upcoming" element={<div>Upcoming Page</div>} />
        <Route path="/home/finished" element={<div>Finished Page</div>} />
        <Route path="/home/top" element={<div>Top Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </>
  );
};

describe("TopBar", () => {
  it("should render navigation links and logout button", () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    const logo = screen.getByTestId("logo");
    const siteName = screen.getByTestId("site-name");
    const upcomingLink = screen.getByTestId("upcoming");
    const finishedLink = screen.getByTestId("finished");
    const topLink = screen.getByTestId("top");
    const profileLink = screen.queryByTestId("profile");
    const loginLink = screen.queryByTestId("login");

    expect(logo).toBeInTheDocument();
    expect(siteName).toBeInTheDocument();
    expect(upcomingLink).toBeInTheDocument();
    expect(finishedLink).toBeInTheDocument();
    expect(topLink).toBeInTheDocument();
    expect(profileLink || loginLink).toBeInTheDocument();
  });

  it("should render all button in TopBar", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TestComponent />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("logo"));
    expect(screen.getByText("Home Page")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("site-name"));
    expect(screen.getByText("Home Page")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("upcoming"));
    expect(screen.getByText("Upcoming Page")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("finished"));
    expect(screen.getByText("Finished Page")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("top"));
    expect(screen.getByText("Top Page")).toBeInTheDocument();

    if (screen.queryByTestId("profile")) {
      fireEvent.click(screen.getByTestId("profile"));
      expect(screen.getByText("Profile Page")).toBeInTheDocument();
    } else {
      fireEvent.click(screen.getByTestId("login"));
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    }
  });
});
