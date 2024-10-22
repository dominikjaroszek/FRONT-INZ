import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import useFetch from "../hooks/useFetch";

const SideBar = () => {
  const { data: leagues, loading, error } = useFetch("/leagues/names");
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Leagues</h2>
      <ul className={styles.leagueList}>
        {leagues.map((league) => (
          <li
            key={league.name}
            className={styles.leagueItem}
            onClick={() => navigate(`/league/${league.name}/2024-2025`)} // Zmiana ścieżki na dynamiczną
          >
            {league.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
