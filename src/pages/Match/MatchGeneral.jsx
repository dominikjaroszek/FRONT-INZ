import React from "react";
import styles from "./Match.module.css";

const MatchGeneral = ({ match }) => {
  return (
    <div className={styles.container1}>
      <div className={styles.tableContainer1}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Round</td>
              <td>{match?.round}</td>
            </tr>
            <tr>
              <td>Referee</td>
              <td>{match?.referee}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>{match?.venue_name}</td>
            </tr>
            <tr>
              <td>Capacity</td>
              <td>{match?.capacity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchGeneral;
