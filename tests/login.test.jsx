import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../src/pages/Auth/Login";
import { message as messageApi } from "antd";
import { expect, vi } from "vitest";

vi.mock("antd", () => ({
  message: {
    open: vi.fn(),
  },
}));

describe("Login Page", () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  test("displays error when email and password are empty", async () => {
    const emailInput = await screen.findByTestId("email-input"); // Asynchroniczne czekanie na element
    const passwordInput = await screen.findByTestId("password-input");
    const signInButton = await screen.findByTestId("sign-in-button");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(messageApi.open).toHaveBeenCalledWith({
        type: "error",
        content: "Please fill out the email and password fields.",
      });
    });
  });

  test("displays error when email is empty", async () => {
    const emailInput = await screen.findByTestId("email-input");
    const passwordInput = await screen.findByTestId("password-input");
    const signInButton = await screen.findByTestId("sign-in-button");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(messageApi.open).toHaveBeenCalledWith({
        type: "error",
        content: "Email is required.",
      });
    });
  });

  test("displays error when password is empty", async () => {
    const emailInput = await screen.findByTestId("email-input");
    const passwordInput = await screen.findByTestId("password-input");
    const signInButton = await screen.findByTestId("sign-in-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(messageApi.open).toHaveBeenCalledWith({
        type: "error",
        content: "Password Cannot be empty",
      });
    });
  });

  test("displays error when email format is invalid", async () => {
    const emailInput = await screen.findByTestId("email-input");
    const passwordInput = await screen.findByTestId("password-input");
    const signInButton = await screen.findByTestId("sign-in-button");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(messageApi.open).toHaveBeenCalledWith({
        type: "error",
        content: "Invalid email format. Please try again.",
      });
    });
  });
});
