import { useEffect, useState } from "react";
import { axiosPrivate } from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import styles from "./Profile.module.css";
import SideBarAccount from "./SideBarAccount";

const Profile = () => {
  const { auth } = useAuth();
  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/contact");
        if (response) {
          setAccountData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [auth]);

  return (
    <div className={styles.container}>
      <SideBarAccount />
      <div className={styles.mainContent}>
        <div className={styles.card}>
          <h1 className={styles.title}>Account Information</h1>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>First Name:</span>
              <span className={styles.value}>{accountData.firstName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Last Name:</span>
              <span className={styles.value}>{accountData.lastName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{accountData.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
