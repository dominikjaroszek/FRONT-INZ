// Napisz stronę MATCH, która będzie wyświetlać informacje o meczu. Strona ma wyświetlać:
// - nazwę ligi
// - datę meczu
// - drużyny, które grają
// - wynik meczu
// - informację, czy mecz jest rozegrany

import React from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";

const Match = () => {
  const { league, date, team1, team2, score, isPlayed } = useParams();

  return (
    <>
      <TopBar />
      <div>
        <h1>{league}</h1>
        <p>{date}</p>
        <p>
          {team1} vs {team2}
        </p>
        <p>{score}</p>
        <p>{isPlayed ? "Mecz rozegrany" : "Mecz nie rozegrany"}</p>
      </div>
    </>
  );
};

export default Match;
