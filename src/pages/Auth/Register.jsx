import React, { useState } from "react";
import axios from "../../axiosInstance";
import { message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; 
import styles from "./Register.module.css";

const Register = () => {
  const [nameRegister, setNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [repeatPasswordRegister, setRepeatPasswordRegister] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      registerAccount();
    }
  };

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[.!@#$%^&*(),?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character (e.g., ., !, @, etc.).";
    }
    return null;
  };

  const registerAccount = () => {
    if (!nameRegister) {
      messageApi.open({
        type: "error",
        content: "Please enter your name.",
      });
      return;
    }
    if (!validateName(nameRegister)) {
      messageApi.open({
        type: "error",
        content: "First name can only contain letters.",
      });
      return;
    }
    if (!lastNameRegister) {
      messageApi.open({
        type: "error",
        content: "Please enter your last name.",
      });
      return;
    }
    if (!validateName(lastNameRegister)) {
      messageApi.open({
        type: "error",
        content: "Last name can only contain letters.",
      });
      return;
    }
    if (!emailRegister) {
      messageApi.open({
        type: "error",
        content: "Please enter your email.",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRegister)) {
      messageApi.open({
        type: "error",
        content: "Please enter a valid email address.",
      });
      return;
    }
    if (!passwordRegister) {
      messageApi.open({
        type: "error",
        content: "Please enter your password.",
      });
      return;
    }
    const passwordError = validatePassword(passwordRegister);
    if (passwordError) {
      messageApi.open({
        type: "error",
        content: passwordError,
      });
      return;
    }
    if (passwordRegister !== repeatPasswordRegister) {
      messageApi.open({
        type: "error",
        content: "Passwords do not match.",
      });
      return;
    }

    axios
      .post("/register", {
        firstName: nameRegister,
        lastName: lastNameRegister,
        email: emailRegister,
        password: passwordRegister,
      })
      .then(() => {
        messageApi.success("Registration successful!");
        setNameRegister("");
        setLastNameRegister("");
        setEmailRegister("");
        setPasswordRegister("");
        setRepeatPasswordRegister("");
      })
      .catch((error) => {
        
        if (error.response) {
          messageApi.error(error.response.data.message);
        } else {
          messageApi.error(
            "Registration failed. Please check your internet connection."
          );
        }
      });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.backIcon} onClick={() => window.history.back()}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.registerBox}>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>Create your account</p>
        <input
          type="text"
          placeholder="First name"
          className={styles.input}
          value={nameRegister}
          onChange={(e) => setNameRegister(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <input
          type="text"
          placeholder="Last name"
          className={styles.input}
          value={lastNameRegister}
          onChange={(e) => setLastNameRegister(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <input
          type="text"
          placeholder="Email"
          className={styles.input}
          value={emailRegister}
          onChange={(e) => setEmailRegister(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={passwordRegister}
          onChange={(e) => setPasswordRegister(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <input
          type="password"
          placeholder="Repeat password"
          className={styles.input}
          value={repeatPasswordRegister}
          onChange={(e) => setRepeatPasswordRegister(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button className={styles.button} onClick={registerAccount}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
