import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import React from "react";
import { Anchor, Drawer, Button, Menu } from "antd";
import { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useLogout from "../pages/Auth/useLogout";

import useAuth from "../hooks/useAuth";

function TopBar() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { auth } = useAuth();
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

  const changePassword = () => {
    navigate("/profile/change-password");
  };

  const deleteAccount = () => {
    navigate("/profile/delete-account");
  };

  const logoutAccount = () => {
    logout();
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault(); // Zapobiega domyślnemu działaniu linku
            navigate("/profile"); // Nawiguje do /profile
          }}
        >
          <div style={{ color: "#0d0b26" }}>Information</div>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            deleteAccount();
          }}
        >
          Delete Account
        </a>
      ),
      danger: true,
    },
    {
      key: "4",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            logoutAccount();
          }}
        >
          Logout
        </a>
      ),
    },
  ];

  return (
    <div className={styles.containerColor}>
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
          <div
            className={styles.box}
            onClick={() => navigate("/home/upcoming")}
          >
            Upcoming
          </div>
          <div
            className={styles.box}
            onClick={() => navigate("/home/finished")}
          >
            Finished
          </div>
          <div className={styles.box} onClick={() => navigate("/home/top")}>
            Top
          </div>

          {auth?.accessToken ? (
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <div className={styles.profile}>Profile</div>
              </a>
            </Dropdown>
          ) : (
            <div className={styles.box} onClick={() => navigate("/login")}>
              Login
            </div>
          )}
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
    </div>
  );
}

export default TopBar;
