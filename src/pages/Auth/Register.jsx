import React, { useState } from "react";
import axios from "../../axiosInstance";
import { message } from "antd";

const ModalRegister = () => {
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
        //console.error("Registration error:", error);
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
    <div className="modal-content">
      {contextHolder}
      <h2>Register</h2>
      <p>
        Enter your account details
        <br />
      </p>
      <input
        type="text"
        placeholder="First name"
        className="data-field"
        value={nameRegister}
        onChange={(e) => setNameRegister(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type="text"
        placeholder="Last name"
        className="data-field"
        value={lastNameRegister}
        onChange={(e) => setLastNameRegister(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type="text"
        placeholder="Email"
        className="data-field"
        value={emailRegister}
        onChange={(e) => setEmailRegister(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type="password"
        placeholder="Password"
        className="data-field"
        value={passwordRegister}
        onChange={(e) => setPasswordRegister(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type="password"
        placeholder="Repeat password"
        className="data-field"
        value={repeatPasswordRegister}
        onChange={(e) => setRepeatPasswordRegister(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type="button"
        value="Sign up"
        className="confirm-button"
        onClick={registerAccount}
      />
    </div>
  );
};

export default ModalRegister;
