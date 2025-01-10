import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./LeagueBar.module.css";

const LeagueBar = () => {
  const { leagueName, season } = useParams();
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
          isActive(`/league/${leagueName}/${season}`) ? styles.active : ""
        }`}
      >
        <button onClick={() => navigate(`/league/${leagueName}/${season}`)}>
          General
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/league/${leagueName}/${season}/result`)
            ? styles.active
            : ""
        }`}
      >
        <button
          onClick={() => navigate(`/league/${leagueName}/${season}/result`)}
        >
          Result
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/league/${leagueName}/${season}/upcoming`)
            ? styles.active
            : ""
        }`}
      >
        <button
          onClick={() => navigate(`/league/${leagueName}/${season}/upcoming`)}
        >
          Upcoming
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/live/${season}/${leagueName}`) ? styles.active : ""
        }`}
      >
        <button onClick={() => navigate(`/live/${season}/${leagueName}`)}>
          Live
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/league/${leagueName}/${season}/standing`)
            ? styles.active
            : ""
        }`}
      >
        <button
          onClick={() => navigate(`/league/${leagueName}/${season}/standing`)}
        >
          Standings
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          isActive(`/league/${leagueName}/${season}/archive`)
            ? styles.active
            : ""
        }`}
      >
        <button
          onClick={() => navigate(`/league/${leagueName}/${season}/archive`)}
        >
          Archive
        </button>
      </div>
    </nav>
  );
};

export default LeagueBar;
