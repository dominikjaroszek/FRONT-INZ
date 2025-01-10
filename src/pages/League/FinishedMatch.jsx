// pages/LeagueDetails.jsx
import React, { useState } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import useFetch from "../../hooks/useFetch";
import LeagueBar from "../../components/LeagueBar";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueHome.module.css";
import LeagueDetails from "../../components/LeagueDetails";
import MatchList from "../../components/MatchList";

const FinishedMatch = () => {
  const { leagueName } = useParams();
  const { season } = useParams();
  const [limit, setLimit] = useState(10);

  const handleMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/finished-matches/${leagueName}/${season}/${limit}`);

  if (matchesLoading) return <p>Loading...</p>;
  if (matchesError) return <p>Error: {matchesError.message}</p>;

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <LeagueDetails leagueName={leagueName} season={season} />
          <LeagueBar leagueName={leagueName} />
          <div className={styles.leagueHeader}>
            <div className={styles.button}>Finished matches</div>
          </div>
          <MatchList matches={matchesData} finished={1} />
          <div className={styles.ShowMore} onClick={handleMore}>
            See more
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedMatch;
