import React from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import MatchBar from "./MatchBar";
import styles from "./Match.module.css";

const Match = () => {
  const { matchid, type } = useParams();

  return (
    <div className={styles.cointaner}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.leagueDetails}>
          <MatchBar />
        </div>
      </div>
    </div>
  );
};

export default Match;
