import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import LeagueBar from "../../components/LeagueBar";
import styles from "./LeagueHome.module.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LeagueDetails from "../../components/LeagueDetails";
import MatchList from "../../components/MatchList";

const General = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const {
    data: matchesFinishedData,
    loading: matchesFinishedLoading,
    error: matchesFinishedError,
  } = useFetch(`/finished-matches/${leagueName}/${season}/2`);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/${leagueName}/${season}/2`);

  const {
    data: matchesLiveData,
    loading: matchesLiveLoading,
    error: matchesLiveError,
  } = useFetch(`/live/${leagueName}`);

  if (matchesLoading) return <p>Loading...</p>;
  if (matchesError) return <p>Error: {matchesError.message}</p>;

  if (matchesFinishedLoading) return <p>Loading...</p>;
  if (matchesFinishedError) return <p>Error: {matchesFinishedError.message}</p>;

  if (matchesLiveLoading) return <p>Loading...</p>;
  if (matchesLiveError) return <p>Error: {matchesLiveError.message}</p>;

  return (
    <div key={location.pathname} className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <h2>Ukończone mecze</h2>
          <MatchList matches={matchesFinishedData} finished={1} />
          <p onClick={() => navigate(`/league/${leagueName}/${season}/result`)}>
            zobacz wiecej
          </p>
          <h2>Nadchodzące mecze</h2>
          {matchesData.length === 0 && <p>Brak meczów nadchodzących</p>}
          {matchesData.length > 0 ? (
            <p
              onClick={() =>
                navigate(`/league/${leagueName}/${season}/upcoming`)
              }
            >
              Kliknij, aby zobaczyć więcej
            </p>
          ) : null}
          <MatchList matches={matchesData} finished={0} />
          <h2>Na żywo</h2>
          {matchesLiveData.length === 0 && <p>Brak meczów na żywo</p>}
          {matchesLiveData.length > 0 ? (
            <p onClick={() => navigate(`/live/${leagueName}/${season}`)}>
              Kliknij, aby zobaczyć więcej
            </p>
          ) : null}
          <MatchList matches={matchesLiveData} finished={1} />
        </div>
      </div>
    </div>
  );
};

export default General;
