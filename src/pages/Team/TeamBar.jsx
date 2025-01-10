import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Team.module.css";

const TeamBar = ({ teamName, leagueName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    const encodedPath = encodeURI(path);
    return location.pathname === encodedPath;
  };

  return (
    <nav className={styles.nav}>
      <div
        className={`${styles.navItem} ${
          isActive(`/team/${teamName}`) ? styles.active : ""
        }`}
      >
        <button onClick={() => navigate(`/team/${teamName}`)}>General</button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/team/${teamName}/result`) ? styles.active : ""
        }`}
      >
        <button onClick={() => navigate(`/team/${teamName}/result`)}>
          Result
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/team/${teamName}/upcoming`) ? styles.active : ""
        }`}
      >
        <button onClick={() => navigate(`/team/${teamName}/upcoming`)}>
          Upcoming
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/team/${leagueName}/2024 - 2025/${teamName}/standing`)
            ? styles.active
            : ""
        }`}
      >
        <button
          onClick={() =>
            navigate(`/team/${leagueName}/2024 - 2025/${teamName}/standing`)
          }
        >
          Standings
        </button>
      </div>
    </nav>
  );
};

export default TeamBar;
