import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosInstance";
import useAuth from "../../hooks/useAuth";
import { message as messageApi } from "antd";
import styles from "./Login.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // loginOutput was unused in the UI, but keeping state as requested
  const [loginOutput, setLoginOutput] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. Modified to accept the event
  const handleLogin = async (event) => {
    // 2. Prevent the default form reload behavior
    if (event) event.preventDefault();

    if (!emailInput && !passwordInput) {
      messageApi.open({
        type: "error",
        content: "Please fill out the email and password fields.",
      });
      return;
    }

    if (!emailInput) {
      messageApi.open({
        type: "error",
        content: "Email is required.",
      });
      return;
    }

    if (!passwordInput) {
      messageApi.open({
        type: "error",
        content: "Password Cannot be empty",
      });
      return;
    }

    if (!emailRegex.test(emailInput)) {
      messageApi.open({
        type: "error",
        content: "Invalid email format. Please try again.",
      });
      return;
    }

    axiosInstance
      .post("/auth/login/", {
        email: emailInput,
        password: passwordInput,
      })
      .then((response) => {
        const access_token = response?.data?.access;
        const refresh_token = response?.data?.refresh;
        const token_decoded = jwtDecode(access_token);
        const authData = {
          accessToken: access_token,
          refreshToken: refresh_token,
          role: token_decoded.role,
          username: token_decoded.firstName + " " + token_decoded.lastName,
        };

        setLoginOutput("Login successful!");
        setEmailInput("");
        setPasswordInput("");
        setAuth(authData);
        localStorage.setItem("authData", JSON.stringify(authData));
        if (token_decoded.role.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Login failed. Please try again.",
        });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backIcon} onClick={() => navigate("/")}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>Hey, sign in to your account</p>
        
        {/* 3. Wrapped inputs in a form tag */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            // 4. Removed onKeyUp (Form handles 'Enter' automatically)
            data-testid="email-input"
            autoComplete="username" 
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            // 4. Removed onKeyUp
            data-testid="password-input"
            autoComplete="current-password"
          />
          {/* 5. Changed type to submit */}
          <button 
            type="submit" 
            className={styles.button} 
            data-testid="sign-in-button"
          >
            Sign In
          </button>
        </form>

        <div
          className={styles.registerLink}
          onClick={() => navigate("/register")}
        >
          Don’t have an account? <b>Register now</b>
        </div>
      </div>
    </div>
  );
};

export default Login;