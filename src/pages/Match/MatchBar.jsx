import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import MatchFinished from "./MatchFinished";
import MatchScheduled from "./MatchScheduled";
import { useParams } from "react-router-dom";
import StandingBar from "../../components/Standing/StandingBar";
import MatchStatists from "./MatchStatists";
import Rating from "../../components/Rating";
import styles from "./Match.module.css";
import MatchGeneral from "./MatchGeneral";

const MatchBar = () => {
  const { matchid } = useParams();
  const { data: match, loading, error } = useFetch(`/match/${matchid}`);

  const [activeView, setActiveView] = useState(
    () => localStorage.getItem("activeView") || match?.type
  );

  useEffect(() => {
    if (activeView) {
      localStorage.setItem("activeView", activeView);
    }
  }, [activeView]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderView = () => {
    if (match?.type === "Finished") {
      return (
        <>
          <MatchFinished match={match} />
          <nav className={styles.nav}>
            <div className={styles.navItem}>
              <button
                className={activeView === "General" ? styles.active : ""}
                onClick={() => setActiveView("General")}
              >
                General
              </button>
              <button
                className={activeView === "Statists" ? styles.active : ""}
                onClick={() => setActiveView("Statists")}
              >
                Statists
              </button>
              <button
                className={activeView === "Rating" ? styles.active : ""}
                onClick={() => setActiveView("Rating")}
              >
                Rating
              </button>
            </div>
            <div className={styles.navItem}>
              <button
                className={activeView === "Standing" ? styles.active : ""}
                onClick={() => setActiveView("Standing")}
              >
                Standing
              </button>
            </div>
          </nav>
          {(() => {
            switch (activeView) {
              case "General":
                return <MatchGeneral match={match} />;
              case "Statists":
                return <MatchStatists match={match} />;
              case "Standing":
                return (
                  <div className={styles.main}>
                    <StandingBar
                      leagueName={match.league_name}
                      season={match.season}
                    />
                  </div>
                );
              case "Rating":
                return <Rating match_id={match.match_id} />;
              default:
                return null;
            }
          })()}
        </>
      );
    } else {
      return (
        <>
          <MatchScheduled match={match} />
          <nav className={styles.nav}>
            <div className={styles.navItem}>
              <button
                className={activeView === "General" ? styles.active : ""}
                onClick={() => setActiveView("General")}
              >
                General
              </button>
            </div>
            <div className={styles.navItem}>
              <button
                className={activeView === "Standing" ? styles.active : ""}
                onClick={() => setActiveView("Standing")}
              >
                Standing
              </button>
            </div>
          </nav>
          {(() => {
            switch (activeView) {
              case "General":
                return <MatchGeneral match={match} />;

              case "Standing":
                return (
                  <div className={styles.main}>
                    <StandingBar
                      leagueName={match.league_name}
                      season={match.season}
                    />
                  </div>
                );

              default:
                return null;
            }
          })()}
        </>
      );
    }
  };

  return <div className={styles.Bar}>{renderView()}</div>;
};

export default MatchBar;
