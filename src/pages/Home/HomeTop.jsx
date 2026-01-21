import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./HomeTop.module.css";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";

const HomeTop = () => {
  // ZMIANA 1: Domyślne sortowanie ustawione na nazwę pola z backendu (hype_score)
  const [sortBy, setSortBy] = useState("hype_score");
  const [viewMode, setViewMode] = useState("league");

  // ZMIANA 2: Używamy standardowego endpointu, który zwraca pogrupowane dane
  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/scores`);

  const navigate = useNavigate();

  if (matchesLoading) return <p data-testid="loading">Loading...</p>;
  if (matchesError)
    return <p data-testid="error">Error: {matchesError.message}</p>;

  // Funkcja sortująca - zabezpieczona przed wartościami null (|| 0)
  const sortMatches = (matches) => {
    if (!matches) return [];
    return [...matches].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.nav}>
              <div
                className={`${styles.navItem} ${
                  viewMode === "league" ? styles.active : ""
                }`}
              >
                <button
                  onClick={() => setViewMode("league")}
                  data-testid="view-league"
                >
                  Division into leagues
                </button>
              </div>
              <div
                className={`${styles.navItem} ${
                  viewMode === "all" ? styles.active : ""
                }`}
              >
                <button
                  onClick={() => setViewMode("all")}
                  data-testid="view-all"
                >
                  All matches
                </button>
              </div>
            </div>

            <div className={styles.sortBy}>
              <div className={styles.title1}>SortBy: </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ marginLeft: "10px", backgroundColor: "#58a6ff" }}
                data-testid="sort-by"
              >
                {/* ZMIANA 3: Wartości value muszą odpowiadać polom z MatchListSerializer */}
                <option value="hype_score">Generally (Hype)</option>
                <option value="tactical_score">Tactical</option>
                <option value="aggression_score">Aggression</option>
                <option value="defense_score">Defense</option>
              </select>
            </div>
          </div>

          {viewMode === "league" ? (
            !matchesByLeague || matchesByLeague.length === 0 ? (
              <p data-testid="no-matches">Brak nadchodzących meczów</p>
            ) : (
              matchesByLeague.map((league) => (
                <div key={league.league_name} data-testid="league">
                  <div className={styles.singleLeagueHeader}>
                    <div className={styles.button}>{league.league_name}</div>
                  </div>
                  <MatchList
                    matches={sortMatches(league.matches)}
                    finished={2} // Zakładam, że finished={2} oznacza tryb "Rankingu" w Twoim MatchList
                    sortBy={sortBy}
                  />
                </div>
              ))
            )
          ) : (
            <MatchList
              matches={sortMatches(
                // flatMap zadziała poprawnie, bo backend zwraca [{league_name, matches: []}]
                matchesByLeague 
                  ? matchesByLeague.flatMap((league) => league.matches || [])
                  : []
              )}
              finished={2}
              sortBy={sortBy}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTop;