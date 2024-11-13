import React from "react";
import useFetch from "../../hooks/useFetch";

const TopScorerStanding = ({ season, leagueName }) => {
  const {
    data: standingsDetail,
    loading,
    error,
  } = useFetch(`/leagues/top_scorers/${leagueName}/${season}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {standingsDetail && (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Player_Name</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {standingsDetail.map((player, index) => (
                <tr key={index}>
                  <td>{player.position}</td>
                  <td>{player.player_name}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                  <td>{player.team_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TopScorerStanding;
