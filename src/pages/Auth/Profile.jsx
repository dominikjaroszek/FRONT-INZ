import { useEffect, useState } from "react";
import { Button, Form, Input, Space, Switch } from "antd";
import styles from "./Profile.module.css";
import { axiosPrivate } from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const appStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  };
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
        console.log(response);
        if (response) {
          setAccountData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleDataChange = async (inputType, value) => {
  //   try {
  //     const params = {
  //       [inputType]: value,
  //     };

  //     const response = await axiosPrivate.patch("/update_user", params);

  //     if (response) {
  //       messageApi.open({
  //         type: "info",
  //         content: JSON.stringify(response.data.message, null, 2),
  //       });
  //     }
  //   } catch (err) {
  //     //  console.log(err);
  //   }
  // };

  // const handleSwitch = async (checked) => {
  //   try {
  //     const response = await axiosPrivate.patch("/notification");

  //     if (response) {
  //       messageApi.open({
  //         type: "info",
  //         content: JSON.stringify(response.data.message, null, 2),
  //       });
  //     }
  //     setAccountData((prevData) => ({
  //       ...prevData,
  //       notification: checked,
  //     }));
  //   } catch (err) {
  //     //console.log(err);
  //   }
  // };

  return (
    <>
      <div style={appStyles}>
        <div className={styles.mainBox}>
          <div className={styles.accountBox}>
            <p className={styles.detailsTitle}>Account Details</p>
            <div className={styles.form}>
              <Form layout={"vertical"}>
                <Form.Item className={styles.formItem} label="First Name">
                  <Space.Compact
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input
                      name="name"
                      value={accountData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        handleDataChange("name", accountData.firstName)
                      }
                      className={styles.button}
                    >
                      Save
                    </Button>
                  </Space.Compact>
                </Form.Item>
                <Form.Item className={styles.formItem} label="Last Name">
                  <Space.Compact
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input
                      name="surname"
                      value={accountData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        handleDataChange("surname", accountData.surname)
                      }
                      className={styles.button}
                    >
                      Save
                    </Button>
                  </Space.Compact>
                </Form.Item>
                <Form.Item className={styles.formItem} label="Email">
                  <Space.Compact
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input
                      name="email"
                      value={accountData.email}
                      onChange={handleInputChange}
                      placeholder="example@example.com"
                      readOnly={true}
                    />
                  </Space.Compact>
                </Form.Item>
              </Form>

              <div className={styles.logoutButton}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
