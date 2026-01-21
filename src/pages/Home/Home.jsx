import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./Home.module.css";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";

const Home = () => {
  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/round`);

  const {
    data: matchesFinished,
    loading: matchesFinishedLoading,
    error: matchesFinishedError,
  } = useFetch(`/finished-matches/round`);

  const navigate = useNavigate();

  const [expandedLeagues, setExpandedLeagues] = useState({});

  if (matchesLoading || matchesFinishedLoading) return <p>Loading...</p>;

  if (matchesError || matchesFinishedError) {
    return (
      <p>
        Error: {matchesError?.message || matchesFinishedError?.message}
      </p>
    );
  }

  const leagues = {};
  // Usunięto matchesLive z tablicy i logiki poniżej
  [...matchesByLeague, ...matchesFinished].forEach((league) => {
    if (!leagues[league.league_name]) {
      leagues[league.league_name] = { upcoming: [], finished: [] };
    }
    if (matchesByLeague.includes(league))
      leagues[league.league_name].upcoming = league.matches;
    if (matchesFinished.includes(league))
      leagues[league.league_name].finished = league.matches;
  });

  const toggleExpand = (leagueName, category) => {
    setExpandedLeagues((prev) => ({
      ...prev,
      [leagueName]: {
        ...prev[leagueName],
        [category]: !prev[leagueName]?.[category],
      },
    }));
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.mainContent}>
          {Object.keys(leagues).map((leagueName) => (
            <div key={leagueName} className={styles.league}>
              {/* Sekcja Upcoming */}
              <div className={styles.singleLeague}>
                <div
                  className={styles.leagueHeader}
                  onClick={() =>
                    navigate(`/league/${leagueName}/2024-2025/upcoming`)
                  }
                >
                  <div className={styles.button}>Upcoming Matches</div>
                  <div className={styles.singleLeagueHeader}>
                    <div className={styles.button}>{leagueName}</div>
                    <div
                      className={styles.button}
                      onClick={() =>
                        navigate(`/league/${leagueName}/2024-2025/standing`)
                      }
                    >
                      Table
                    </div>
                  </div>
                </div>

                {leagues[leagueName].upcoming.length ? (
                  <>
                    <MatchList
                      matches={
                        expandedLeagues[leagueName]?.upcoming
                          ? leagues[leagueName].upcoming
                          : leagues[leagueName].upcoming.slice(0, 2)
                      }
                      finished={0}
                    />
                    {leagues[leagueName].upcoming.length > 2 && (
                      <button
                        className={styles.showMore}
                        onClick={() => toggleExpand(leagueName, "upcoming")}
                      >
                        {expandedLeagues[leagueName]?.upcoming
                          ? "See less"
                          : "See more"}
                      </button>
                    )}
                  </>
                ) : (
                  <p>No upcoming matches</p>
                )}
              </div>

              {/* Sekcja Finished */}
              <div className={styles.singleLeague}>
                <div
                  className={styles.leagueHeader}
                  onClick={() =>
                    navigate(`/league/${leagueName}/2024-2025/result`)
                  }
                >
                  <div className={styles.button}>Finished Matches</div>
                </div>
                {leagues[leagueName].finished.length ? (
                  <>
                    <MatchList
                      matches={
                        expandedLeagues[leagueName]?.finished
                          ? leagues[leagueName].finished
                          : leagues[leagueName].finished.slice(0, 2)
                      }
                      finished={1}
                    />

                    {leagues[leagueName].finished.length > 2 && (
                      <button
                        className={styles.showMore}
                        onClick={() => toggleExpand(leagueName, "finished")}
                      >
                        {expandedLeagues[leagueName]?.finished
                          ? "See less"
                          : "See more"}
                      </button>
                    )}
                  </>
                ) : (
                  <p>No finished matches</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;