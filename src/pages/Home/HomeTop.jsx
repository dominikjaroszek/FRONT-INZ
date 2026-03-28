import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import styles from "./HomeTop.module.css";
import useFetch from "../../hooks/useFetch";
import { axiosPrivate } from "../../hooks/useAxiosPrivate";
import MatchList from "../../components/MatchList";

// Ikona ognia
const FireIcon = () => <span role="img" aria-label="fire">🔥</span>;

const HomeTop = () => {
  const [sortBy, setSortBy] = useState("hype_score");
  const [viewMode, setViewMode] = useState("league");
  
  const [recMatches, setRecMatches] = useState([]);
  const [recLoading, setRecLoading] = useState(true);
  
  const navigate = useNavigate();

  const {
    data: matchesByLeague,
    loading: matchesLoading,
    error: matchesError,
  } = useFetch(`/upcoming-matches/scores`);

  useEffect(() => {
    let isMounted = true;
    const fetchRecommendations = async () => {
      try {
        const response = await axiosPrivate.get('/matches/recommended/');
        if (isMounted) {
            setRecMatches(response.data);
            setRecLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
        if (isMounted) setRecLoading(false);
      }
    };

    fetchRecommendations();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortMatches = (matches) => {
    if (!matches) return [];
    return [...matches].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  };

  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  if (matchesLoading) return <p data-testid="loading" className={styles.loadingText}>Loading...</p>;
  if (matchesError) return <p data-testid="error" className={styles.errorText}>Error: {matchesError.message}</p>;

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.mainContent}>
            
          {/* --- PANEL REKOMENDACJI --- */}
          {!recLoading && recMatches.length > 0 && (
            <div className={styles.recommendationSection}>
                <div className={styles.recTitle}>
                    <FireIcon /> Recommended for You based on your profile
                </div>
                <div className={styles.recGrid}>
                    {recMatches.map((match) => (
                        <div 
                            key={match.id} 
                            className={styles.recCard}
                            onClick={() => handleMatchClick(match.id)}
                        >
                            <div className={styles.matchScoreBadge}>
                                {match.match_score}% Match
                            </div>

                            <div className={styles.recLeague}>
                                <img src={match.league_logo} alt="league" className={styles.miniLogo} />
                                {match.league_name}
                            </div>

                            <div className={styles.recTeams}>
                                <div className={styles.recTeam}>
                                    <img src={match.home_team.logo} alt={match.home_team.name} />
                                    <span>{match.home_team.name}</span>
                                </div>
                                <div className={styles.recVs}>VS</div>
                                <div className={styles.recTeam}>
                                    <img src={match.away_team.logo} alt={match.away_team.name} />
                                    <span>{match.away_team.name}</span>
                                </div>
                            </div>

                            <div className={styles.recDate}>
                                {formatDate(match.date)}
                            </div>
                            
                            <div className={styles.recStats}>
                                <div className={styles.statBar}>
                                    <span>Hype</span>
                                    <div className={styles.barBg}>
                                        <div className={styles.barFill} style={{width: `${match.analytics.hype_score}%`, background: '#da3633'}}></div>
                                    </div>
                                </div>
                                <div className={styles.statBar}>
                                    <span>Aggression</span>
                                    <div className={styles.barBg}>
                                        <div className={styles.barFill} style={{width: `${match.analytics.aggression_score}%`, background: '#d29922'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* --- PANEL KONTROLNY (Nawigacja i Sortowanie) --- */}
          <div className={styles.header}>
            <div className={styles.nav}>
              <div className={`${styles.navItem} ${viewMode === "league" ? styles.active : ""}`}>
                <button onClick={() => setViewMode("league")} data-testid="view-league">
                  Division into leagues
                </button>
              </div>
              <div className={`${styles.navItem} ${viewMode === "all" ? styles.active : ""}`}>
                <button onClick={() => setViewMode("all")} data-testid="view-all">
                  All matches
                </button>
              </div>
            </div>

            <div className={styles.sortBy}>
              <div className={styles.title1}>SortBy: </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-by"
              >
                <option value="hype_score">Generally (Hype)</option>
                <option value="tactical_score">Tactical</option>
                <option value="aggression_score">Aggression</option>
                <option value="defense_score">Defense</option>
              </select>
            </div>
          </div>

          {/* --- LISTA MECZÓW --- */}
          {viewMode === "league" ? (
            !matchesByLeague || matchesByLeague.length === 0 ? (
              <p className={styles.noMatches} data-testid="no-matches">No upcoming matches</p>
            ) : (
              matchesByLeague.map((league) => (
                <div key={league.league_name} className={styles.singleLeague} data-testid="league">
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
            <div className={styles.allMatchesContainer}>
              <MatchList
                matches={sortMatches(
                  matchesByLeague
                    ? matchesByLeague.flatMap((league) => league.matches || [])
                    : []
                )}
                finished={2}
                sortBy={sortBy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTop;