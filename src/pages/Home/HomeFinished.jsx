import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./Home.module.css";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";

const HomeFinished = () => {
  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/finished-matches/round`);

  const navigate = useNavigate();

  if (matchesLoading) return <p>Loading...</p>;
  if (matchesError) return <p>Error: {matchesError.message}</p>;

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />

        {matchesByLeague.length === 0 && <p>Brak nadchodzących meczów</p>}

        {matchesByLeague.map((league) => {
          return (
            <div key={league.league_name}>
              <h3
                onClick={() =>
                  navigate(`/league/${league.league_name}/2024-2025/finished`)
                }
              >
                {league.league_name}
              </h3>
              <button
                onClick={() =>
                  navigate(`/league/${league.league_name}/2024-2025/standing`)
                }
              >
                Tabela
              </button>

              <MatchList matches={league.matches} finished={1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFinished;
