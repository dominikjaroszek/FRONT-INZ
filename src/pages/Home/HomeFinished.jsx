import React from "react";
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

  
  const leagues = {};
  matchesByLeague.forEach((league) => {
    if (!leagues[league.league_name]) {
      leagues[league.league_name] = { finished: [] };
    }
    leagues[league.league_name].finished = league.matches;
  });

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.mainContent}>
          {Object.keys(leagues).map((leagueName) => (
            <div key={leagueName} className={styles.singleLeague}>
              <div
                className={styles.leagueHeader}
                onClick={() =>
                  navigate(`/league/${leagueName}/2024-2025/finished`)
                }
              >
                <div className={styles.button}>Finished matches</div>
                <div className={styles.singleLeagueHeader}>
                  <div className={styles.button}>{leagueName}</div>
                  <div
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/league/${leagueName}/2024-2025/standing`);
                    }}
                  >
                    Table
                  </div>
                </div>
              </div>

              {leagues[leagueName].finished.length ? (
                <MatchList
                  matches={leagues[leagueName].finished}
                  finished={1}
                />
              ) : (
                <p>No finished matches</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFinished;
