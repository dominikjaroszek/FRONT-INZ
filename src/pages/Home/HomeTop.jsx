import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./HomeTop.module.css";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";

const HomeTop = () => {
  const [sortBy, setSortBy] = useState("fans_rank_generally");
  const [viewMode, setViewMode] = useState("league");

  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/round/fans`);

  const navigate = useNavigate();

  if (matchesLoading) return <p data-testid="loading">Loading...</p>;
  if (matchesError)
    return <p data-testid="error">Error: {matchesError.message}</p>;

  const sortMatches = (matches) => {
    return [...matches].sort((a, b) => b[sortBy] - a[sortBy]);
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
                <option value="fans_rank_generally">Generally</option>
                <option value="fans_rank_attak">Attack</option>
                <option value="fans_rank_aggresion">Aggression</option>
              </select>
            </div>
          </div>
          {viewMode === "league" ? (
            matchesByLeague.length === 0 ? (
              <p data-testid="no-matches">Brak nadchodzących meczów</p>
            ) : (
              matchesByLeague.map((league) => (
                <div key={league.league_name} data-testid="league">
                  <div className={styles.singleLeagueHeader}>
                    <div className={styles.button}>{league.league_name}</div>
                  </div>
                  <MatchList
                    matches={sortMatches(league.matches)}
                    finished={2}
                    sortBy={sortBy}
                  />
                </div>
              ))
            )
          ) : (
<MatchList
  matches={sortMatches(
    matchesByLeague.flatMap((league) => league.matches || [])
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
