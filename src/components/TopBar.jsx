import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

function TopBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.mainBox}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
      </div>
      <div className={styles.siteName} onClick={() => navigate("/")}>
        SoccerFans
      </div>
      {/* <div className={styles.box} onClick={() => navigate("/match")}>
        Match
      </div>
      <div className={styles.box} onClick={() => navigate("/result")}>
        Result
      </div> */}
      <SearchBar />
    </div>
  );
}

export default TopBar;
