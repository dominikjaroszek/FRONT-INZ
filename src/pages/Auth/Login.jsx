import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosInstance";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import { message as messageApi } from "antd";
import styles from "./Login.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginOutput, setLoginOutput] = useState("");

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleLogin();
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
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
      .post("/login", {
        email: emailInput,
        password: passwordInput,
      })
      .then((response) => {
        const access_token = response?.data?.access_token;
        const refresh_token = response?.data?.refresh_token;
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
        <input
          type="text"
          placeholder="Email"
          className={styles.input}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button className={styles.button} onClick={handleLogin}>
          Sign In
        </button>
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
Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default Login;
