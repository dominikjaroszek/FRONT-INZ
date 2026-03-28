import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import useFetch from "../hooks/useFetch";

const SideBar = () => {
  const { data: leagues, loading, error } = useFetch("/leagues/names");
  const navigate = useNavigate();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error</div>;

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Leagues</div>
      <div className={styles.leagueList}>
        {leagues.map((league) => (
          <div
            key={league.name}
            className={styles.leagueItem}
            onClick={() => navigate(`/league/${league.name}/2025`)}
          >
            <img
              className={styles.logo}
              src={league?.logo}
              alt={`${league.name} logo`}
            />
            <span>{league.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;