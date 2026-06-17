import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./Home.module.css";
import useFetch from "../../hooks/useFetch";
import MatchList from "../../components/MatchList";
import { axiosPrivate } from '../../hooks/useAxiosPrivate';

const Home = () => {
  const navigate = useNavigate();
  const [expandedLeagues, setExpandedLeagues] = useState({});
  const [recommendedMatches, setRecommendedMatches] = useState(null);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

useEffect(() => {
    const fetchRecommendedMatches = async () => {
      try {
        const response = await axiosPrivate.get('/matches/recommended-by-style/');
        setRecommendedMatches(response.data);
        setRecommendedLoading(false);
      } catch (error) {
        console.error("Błąd pobierania rekomendowanych meczów:", error);
        setRecommendedLoading(false);
      }
    };

    fetchRecommendedMatches();
  }, []);

  const {
    data: currentSeason,
    loading: seasonLoading,
    error: seasonError,
  } = useFetch(`/seasons/current-year/`);

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

  if (matchesLoading || matchesFinishedLoading || seasonLoading) {
    return <p>Loading...</p>;
  }

  if (matchesError || matchesFinishedError || seasonError) {
    return (
      <p>
        Error: {matchesError?.message || matchesFinishedError?.message || seasonError?.message}
      </p>
    );
  }

  const leagues = {};

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

  const formatSpecialDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.mainContent}>
            
          {!recommendedLoading && recommendedMatches?.length > 0 && (
            <div className={styles.specialPanel}>
              <div className={styles.specialTitle}>✨ Special For You</div>
              <div className={styles.specialGrid}>
                {recommendedMatches.map((match) => (
                  <div 
                    key={match.id} 
                    className={styles.specialCard}
                    onClick={() => navigate(`/match/${match.id}`)}
                  >
                    <div className={styles.specialTeams}>
                      <div className={styles.specialTeam}>
                        <img src={match.home_team.logo} alt="Home" />
                        <span>{match.home_team.name}</span>
                      </div>
                      <div className={styles.specialVs}>VS</div>
                      <div className={styles.specialTeam}>
                        <img src={match.away_team.logo} alt="Away" />
                        <span>{match.away_team.name}</span>
                      </div>
                    </div>
                    <div className={styles.specialDate}>
                      {formatSpecialDate(match.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Object.keys(leagues).map((leagueName) => (
            <div key={leagueName} className={styles.league}>
              
              <div className={styles.singleLeague}>
                <div
                  className={styles.leagueHeader}
                  onClick={() =>
                    navigate(`/league/${leagueName}/${currentSeason}/upcoming`)
                  }
                >
                  <div className={styles.button}>Upcoming Matches</div>
                  <div className={styles.singleLeagueHeader}>
                    <div className={styles.button}>{leagueName}</div>
                    <div
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/league/${leagueName}/${currentSeason}/`);
                      }}
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
                  <p className={styles.noMatches}>No upcoming matches</p>
                )}
              </div>

              <div className={styles.singleLeague}>
                <div
                  className={styles.leagueHeader}
                  onClick={() =>
                    navigate(`/league/${leagueName}/${currentSeason}/result`)
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
                  <p className={styles.noMatches}>No finished matches</p>
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