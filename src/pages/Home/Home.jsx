import React from "react";
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
  const {
    data: matchesLive,
    loading: matchesLiveLoading,
    error: matchesLiveError,
  } = useFetch(`/live`);
  const navigate = useNavigate();

  if (matchesLoading || matchesFinishedLoading || matchesLiveLoading)
    return <p>Loading...</p>;
  if (matchesError || matchesFinishedError || matchesLiveError) {
    return (
      <p>
        Error:{" "}
        {matchesError?.message ||
          matchesFinishedError?.message ||
          matchesLiveError?.message}
      </p>
    );
  }

  // Grupowanie wszystkich meczów według ligi
  const leagues = {};
  [...matchesByLeague, ...matchesFinished, ...matchesLive].forEach((league) => {
    if (!leagues[league.league_name]) {
      leagues[league.league_name] = { upcoming: [], finished: [], live: [] };
    }
    if (matchesByLeague.includes(league))
      leagues[league.league_name].upcoming = league.matches;
    if (matchesFinished.includes(league))
      leagues[league.league_name].finished = league.matches;
    if (matchesLive.includes(league))
      leagues[league.league_name].live = league.matches;
  });

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />

        {Object.keys(leagues).map((leagueName) => (
          <div key={leagueName}>
            <h3
              onClick={() =>
                navigate(`/league/${leagueName}/2024-2025/upcoming`)
              }
            >
              {leagueName}
            </h3>
            <button
              onClick={() =>
                navigate(`/league/${leagueName}/2024-2025/standing`)
              }
            >
              Tabela
            </button>

            <h4>Nadchodzące mecze</h4>
            {leagues[leagueName].upcoming.length ? (
              <MatchList matches={leagues[leagueName].upcoming} finished={0} />
            ) : (
              <p>Brak nadchodzących meczów</p>
            )}

            <h4>Zakończone mecze</h4>
            {leagues[leagueName].finished.length ? (
              <MatchList matches={leagues[leagueName].finished} finished={1} />
            ) : (
              <p>Brak zakończonych meczów</p>
            )}

            <h4>Trwające mecze</h4>
            {leagues[leagueName].live.length ? (
              <MatchList matches={leagues[leagueName].live} finished={0} />
            ) : (
              <p>Brak trwających meczów</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
