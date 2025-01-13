import { useState } from "react";
import styles from "./Password.module.css";
import { axiosPrivate } from "../../hooks/useAxiosPrivate";
import { message, Modal } from "antd";
import SideBarAccount from "./SideBarAccount";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      messageApi.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/\d/.test(password)) {
      messageApi.error("Password must contain at least one digit.");
      return false;
    }
    if (!/[.!@#$%^&*(),?":{}|<>]/.test(password)) {
      messageApi.error(
        "Password must contain at least one special character (e.g., ., !, @, etc.)."
      );
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      messageApi.error("New passwords do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      return;
    }

    try {
      await axiosPrivate.patch("user/change_password", {
        oldPassword,
        newPassword,
      });
      messageApi.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      messageApi.error("Failed to change password.");
      console.error(err);
    }
  };

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Are you sure you want to change your password?",
      onOk: handleChangePassword,
    });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <SideBarAccount />
      <div className={styles.mainContent}>
        <div className={styles.card}>
          <h1 className={styles.title}>Change Password</h1>
          <div className={styles.form}>
            <div className={styles.inputContainer}>
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className={styles.toggleButton}
              >
                {showOldPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={styles.toggleButton}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.toggleButton}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button onClick={showConfirmModal} className={styles.button}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
