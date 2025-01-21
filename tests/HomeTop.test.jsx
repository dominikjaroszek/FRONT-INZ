import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeTop from "../src/pages/Home/HomeTop";
import useFetch from "../src/hooks/useFetch";
import { expect, vi } from "vitest";

// Mock the useFetch hook
vi.mock("../src/hooks/useFetch");

describe("HomeTop", () => {
  it("renders loading state", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: { message: "Error fetching data" },
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("renders matches by league", () => {
    useFetch.mockReturnValue({
      data: [
        {
          league_name: "Premier League",
          matches: [{ id: 1, fans_rank_generally: 10 }],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    expect(screen.getByTestId("league")).toBeInTheDocument();
    expect(screen.queryByTestId("no-matches")).not.toBeInTheDocument();
  });

  it("renders all matches", () => {
    useFetch.mockReturnValue({
      data: [
        {
          league_name: "Premier League",
          matches: [{ id: 1, fans_rank_generally: 10 }],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("view-all"));

    expect(screen.getByTestId("sort-by")).toBeInTheDocument();
  });

  it("sorts matches by fans_rank_generally", () => {
    useFetch.mockReturnValue({
      data: [
        {
          league_name: "Premier League",
          matches: [
            { id: 1, fans_rank_generally: 5 },
            { id: 2, fans_rank_generally: 10 },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("sort-by"), {
      target: { value: "fans_rank_generally" },
    });

    const matches = screen.getAllByTestId("match");
    expect(matches[0]).toHaveTextContent("10");
    expect(matches[1]).toHaveTextContent("5");
  });

  it("sorts matches by fans_rank_attak", () => {
    useFetch.mockReturnValue({
      data: [
        {
          league_name: "Premier League",
          matches: [
            { id: 1, fans_rank_attak: 3 },
            { id: 2, fans_rank_attak: 8 },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("sort-by"), {
      target: { value: "fans_rank_attak" },
    });

    const matches = screen.getAllByTestId("match");
    expect(matches[0]).toHaveTextContent("8");
    expect(matches[1]).toHaveTextContent("3");
  });

  it("sorts matches by fans_rank_aggresion", () => {
    useFetch.mockReturnValue({
      data: [
        {
          league_name: "Premier League",
          matches: [
            { id: 1, fans_rank_aggresion: 7 },
            { id: 2, fans_rank_aggresion: 2 },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HomeTop />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("sort-by"), {
      target: { value: "fans_rank_aggresion" },
    });

    const matches = screen.getAllByTestId("match");
    expect(matches[0]).toHaveTextContent("7");
    expect(matches[1]).toHaveTextContent("2");
  });
});
