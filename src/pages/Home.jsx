import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "./Home.module.css";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/round`);

  const [visibleMatchesCount, setVisibleMatchesCount] = useState({});

  // Inicjujemy hook do nawigacji
  const navigate = useNavigate();

  if (matchesLoading) return <p>Loading...</p>;
  if (matchesError) return <p>Error: {matchesError.message}</p>;

  // Funkcja pokazująca wszystkie mecze i przekierowująca do szczegółów ligi
  const showAllMatches = (leagueName, totalMatches) => {
    // Ustawiamy widoczność wszystkich meczów dla danej ligi
    setVisibleMatchesCount((prevState) => ({
      ...prevState,
      [leagueName]: totalMatches,
    }));

    // Przekierowujemy do widoku danej ligi
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />

        <h2>Nadchodzące mecze</h2>
        {matchesByLeague.length === 0 && <p>Brak nadchodzących meczów</p>}

        {matchesByLeague.map((league) => {
          const visibleCount = visibleMatchesCount[league.league_name] || 3; // Domyślnie 3 mecze

          return (
            <div key={league.league_name}>
              <h3>{league.league_name}</h3>
              <button
                onClick={() =>
                  navigate(`/league/${league.league_name}/2024-2025/upcoming`)
                }
              >
                Name
              </button>
              <button
                onClick={() =>
                  navigate(`/league/${league.league_name}/2024-2025/standing`)  
                }
              >
                Tabela
              </button>
              <ul>
                {league.matches.slice(0, visibleCount).map((match) => (
                  <li key={match.match_id}>
                    {match.home_team} vs {match.away_team} - {match.match_date}
                  </li>
                ))}
              </ul>

              {visibleCount < league.matches.length && (
                <button
                  onClick={() =>
                    showAllMatches(league.league_name, league.matches.length)
                  }
                >
                  Pokaż więcej
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
