import React from "react";
import styles from "./MatchStatists.module.css";

const MatchStatists = ({ match }) => {
  console.log(match?.home_team_shots_insidebox);
  return (
    <div className={styles.matchStatsContainer}>
      <h2>{match?.league_name} - Match Statistics</h2>
      <table className={styles.statsTable}>
        <thead>
          <tr>
            <th>Statystyka</th>
            <th>Home Team</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shots on Goal</td>
            <td>{match?.home_team_shots_on_goal}</td>
            <td>{match?.away_team_shots_on_goal}</td>
          </tr>
          <tr>
            <td>Shots off Goal</td>
            <td>{match.home_team_shots_off_goal}</td>
            <td>{match.away_team_shots_off_goal}</td>
          </tr>
          <tr>
            <td>Total Shots</td>
            <td>{match.home_team_total_shots}</td>
            <td>{match.away_team_total_shots}</td>
          </tr>
          <tr>
            <td>Blocked Shots</td>
            <td>{match.home_team_blocked_shots}</td>
            <td>{match.away_team_blocked_shots}</td>
          </tr>
          <tr>
            <td>Shots Inside Box</td>
            <td>{match.home_team_shots_insidebox}</td>
            <td>{match.away_team_shots_insidebox}</td>
          </tr>
          <tr>
            <td>Shots Outside Box</td>
            <td>{match.home_team_shots_outsidebox}</td>
            <td>{match.away_team_shots_outsidebox}</td>
          </tr>
          <tr>
            <td>Fouls</td>
            <td>{match.home_team_fouls}</td>
            <td>{match.away_team_fouls}</td>
          </tr>
          <tr>
            <td>Corner Kicks</td>
            <td>{match.home_team_corner_kicks}</td>
            <td>{match.away_team_corner_kicks}</td>
          </tr>
          <tr>
            <td>Offsides</td>
            <td>{match.home_team_offsides}</td>
            <td>{match.away_team_offsides}</td>
          </tr>
          <tr>
            <td>Ball Possession</td>
            <td>{match.home_team_ball_possession}%</td>
            <td>{match.away_team_ball_possession}%</td>
          </tr>
          <tr>
            <td>Yellow Cards</td>
            <td>{match.home_team_yellow_cards}</td>
            <td>{match.away_team_yellow_cards}</td>
          </tr>
          <tr>
            <td>Red Cards</td>
            <td>{match.home_team_red_cards}</td>
            <td>{match.away_team_red_cards}</td>
          </tr>
          <tr>
            <td>Goalkeeper Saves</td>
            <td>{match.home_team_goalkeeper_saves}</td>
            <td>{match.away_team_goalkeeper_saves}</td>
          </tr>
          <tr>
            <td>Total Passes</td>
            <td>{match.home_team_total_passes}</td>
            <td>{match.away_team_total_passes}</td>
          </tr>
          <tr>
            <td>Passes Accuracy</td>
            <td>{match.home_team_passes_accuracy}%</td>
            <td>{match.away_team_passes_accuracy}%</td>
          </tr>
          <tr>
            <td>Passes Percent</td>
            <td>{match.home_team_passes_percent}%</td>
            <td>{match.away_team_passes_percent}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatchStatists;
