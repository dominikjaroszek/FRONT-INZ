import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import React from "react";
import { Anchor, Drawer, Button } from "antd";
import { useState } from "react";

function TopBar() {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const handleSearch = (query) => {
    if (query.type === "team") {
      navigate(`/team/${query.value}`);
    }
    if (query.type === "league") {
      navigate(`/league/${query.value}/2024-2025`);
    }
  };

  return (
    <div className={styles.cointaner}>
      <div className={styles.firstBox}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
        </div>
        <div className={styles.siteName} onClick={() => navigate("/")}>
          SoccerFans
        </div>
      </div>

      <div className={styles.boxes}>
        <div className={styles.box} onClick={() => navigate("/home/upcoming")}>
          Upcoming
        </div>
        <div className={styles.box} onClick={() => navigate("/home/finished")}>
          Finished
        </div>
        <div className={styles.box} onClick={() => navigate("/home/top")}>
          Top
        </div>
      </div>
      
      <SearchBar onSearch={handleSearch} />

      <div className={styles.drawerToggle} onClick={showDrawer}>
        <Button type="primary">Menu</Button>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <p onClick={() => navigate("/home/upcoming")}>Upcoming</p>
        <p onClick={() => navigate("/home/finished")}>Finished</p>
        <p onClick={() => navigate("/home/top")}>Top</p>
      </Drawer>
    </div>
  );
}

export default TopBar;
