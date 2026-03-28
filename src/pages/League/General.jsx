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
  } = useFetch(`/finished-matches/${leagueName}/${season}/2/`);

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/${leagueName}/${season}/2/`);


  if (matchesLoading || matchesFinishedLoading) return <p>Loading...</p>;
  
  if (matchesError || matchesFinishedError) {
      return <p>Error: {matchesError?.message || matchesFinishedError?.message}</p>;
  }

  return (
    <div key={location.pathname} className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          
          <div className={styles.leagueHeader}>
            <div className={styles.button}>Finished matches</div>
          </div>
          <MatchList matches={matchesFinishedData} finished={1} />
          {matchesFinishedData.length > 0 ? (
            <div
              className={styles.ShowMore}
              onClick={() => navigate(`/league/${leagueName}/${season}/result`)}
            >
              See more
            </div>
          ) : null}

          <div className={styles.leagueHeader}>
            <div className={styles.button}>Upcoming matches</div>
          </div>
          {matchesData?.length ? (
            <MatchList matches={matchesData} finished={0} />
          ) : (
            <div className={styles.noMatches}>No upcoming matches</div>
          )}

          {matchesData.length > 0 ? (
            <div
              className={styles.ShowMore}
              onClick={() =>
                navigate(`/league/${leagueName}/${season}/upcoming`)
              }
            >
              See more
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default General;