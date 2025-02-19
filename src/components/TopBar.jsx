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
import { Modal } from "antd";

import useAuth from "../hooks/useAuth";

function TopBar() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { auth } = useAuth();
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleSearch = (query) => {
    if (query.type === "team") {
      navigate(`/team/${query.value}`);
    }
    if (query.type === "league") {
      navigate(`/league/${query.value}/2024-2025`);
    }
  };

  const changePassword = () => {
    navigate("/profile/password");
  };

  const confirmLogout = () => {
    logout();
  };

  const logoutAccount = () => {
    setIsLogoutModalVisible(true);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate("/profile");
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
            logoutAccount();
          }}
        >
          Logout
        </a>
      ),
      danger: true,
    },
  ];

  return (
    <div className={styles.containerColor}>
      <Modal
        title="Confirm Logout"
        visible={isLogoutModalVisible}
        onOk={() => {
          confirmLogout();
          setIsLogoutModalVisible(false);
        }}
        onCancel={() => setIsLogoutModalVisible(false)}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      <div className={styles.cointaner}>
        <div className={styles.firstBox}>
          <div
            className={styles.logo}
            onClick={() => navigate("/")}
            data-testid="logo"
          >
            <img src={logo} alt="Logo" className={styles.logoImg} />
          </div>
          <div
            className={styles.siteName}
            onClick={() => navigate("/")}
            data-testid="site-name"
          >
            SoccerFans
          </div>
        </div>

        <div className={styles.boxes}>
          <div
            className={styles.box}
            onClick={() => navigate("/home/upcoming")}
            data-testid="upcoming"
          >
            Upcoming
          </div>
          <div
            className={styles.box}
            onClick={() => navigate("/home/finished")}
            data-testid="finished"
          >
            Finished
          </div>
          <div
            className={styles.box}
            onClick={() => navigate("/home/top")}
            data-testid="top"
          >
            Recommended
          </div>

          {auth?.accessToken ? (
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()} data-testid="profile">
                <div className={styles.profile}>Profile</div>
              </a>
            </Dropdown>
          ) : (
            <div
              className={styles.box}
              onClick={() => navigate("/login")}
              data-testid="login"
            >
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
          <p onClick={() => navigate("/home/top")}>Recommended</p>
        </Drawer>
      </div>
    </div>
  );
}

export default TopBar;
