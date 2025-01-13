import React from "react";
import styles from "./SideBarAccount.module.css";
import { useNavigate } from "react-router-dom";

const SideBarAccount = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Options</h2>
      <div className={styles.menu}>
        <div
          onClick={() => navigate("/")}
          className={`${styles.menuItem} ${styles.menuItemBack}`}
        >
          Back
        </div>
        <div onClick={() => navigate("/profile")} className={styles.menuItem}>
          Information
        </div>
        <div
          onClick={() => navigate("/profile/password")}
          className={styles.menuItem}
        >
          Change Password
        </div>
      </div>
    </div>
  );
};

export default SideBarAccount;
