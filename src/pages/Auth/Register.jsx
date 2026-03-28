import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import { message, Select, Button } from "antd"; 
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./Register.module.css";
import PersonalityQuiz from "./PersonalityQuiz"; 

import { 
  PERSONALITY_PRESETS, 
  FOOTBALL_PROFILE_MAP 
} from "../../utils/personalityConfig";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [nameRegister, setNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [repeatPasswordRegister, setRepeatPasswordRegister] = useState("");
  
  const [personalityType, setPersonalityType] = useState(null);
  const [footballProfile, setFootballProfile] = useState(null); 
  
  const [finalStats, setFinalStats] = useState({
    base_hype: 50,
    base_tactical: 50,
    base_aggression: 50,
    base_defense: 50
  });

  const [quizVisible, setQuizVisible] = useState(false);

  const validateName = (name) => /^[A-Za-z]+$/.test(name);

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one digit.";
    if (!/[.!@#$%^&*(),?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return null;
  };

  const handleQuizComplete = (result) => {
    setPersonalityType(result.type);
    setFootballProfile(result.footballProfile);
    setFinalStats(result.stats);
    
    setQuizVisible(false);
    messageApi.success(`Ankieta zakończona! Wynik: ${result.type} (${result.footballProfile}).`);
  };

  const handleManualSelection = (value) => {
    setPersonalityType(value);
    
    const presetStats = PERSONALITY_PRESETS[value];
    const fProfile = FOOTBALL_PROFILE_MAP[value];

    if (presetStats) {
        setFinalStats(presetStats);
        setFootballProfile(fProfile);
    }
  };

  const registerAccount = (event) => {
    if (event) event.preventDefault();

    if (!nameRegister) return messageApi.error("Please enter your name.");
    if (!validateName(nameRegister)) return messageApi.error("First name can only contain letters.");
    if (!lastNameRegister) return messageApi.error("Please enter your last name.");
    if (!validateName(lastNameRegister)) return messageApi.error("Last name can only contain letters.");
    if (!emailRegister) return messageApi.error("Please enter your email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRegister)) return messageApi.error("Please enter a valid email address.");
    if (!passwordRegister) return messageApi.error("Please enter your password.");
    
    const passwordError = validatePassword(passwordRegister);
    if (passwordError) return messageApi.error(passwordError);
    if (passwordRegister !== repeatPasswordRegister) return messageApi.error("Passwords do not match.");

    if (!personalityType) {
        return messageApi.error("Proszę wybrać typ osobowości lub rozwiązać ankietę.");
    }

    const payload = {
        email: emailRegister,
        first_name: nameRegister,
        last_name: lastNameRegister,
        password: passwordRegister,
        confirm_password: repeatPasswordRegister,
        
        personality_type: personalityType,
        football_profile: footballProfile,
        ...finalStats 
    };

    axios
      .post("/auth/register/", payload)
      .then(() => {
        messageApi.success("Rejestracja udana! Możesz się teraz zalogować.");
        setNameRegister(""); setLastNameRegister(""); setEmailRegister("");
        setPasswordRegister(""); setRepeatPasswordRegister(""); 
        setPersonalityType(null); setFootballProfile(null);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          messageApi.error(error.response.data.message || JSON.stringify(error.response.data));
        } else {
          messageApi.error("Registration failed. Please check your internet connection.");
        }
      });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      
      <PersonalityQuiz 
        visible={quizVisible} 
        onClose={() => setQuizVisible(false)} 
        onComplete={handleQuizComplete} 
      />

      <div className={styles.registerBox}>
        {/* Przycisk powrotu teraz wewnątrz karty (jak w Login) */}
        <div className={styles.backIcon} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </div>
        
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>Create your account</p>
        
        <form onSubmit={registerAccount}>
          <input
            type="text" placeholder="First name" className={styles.input}
            value={nameRegister} onChange={(e) => setNameRegister(e.target.value)}
            autoComplete="given-name"
          />
          <input
            type="text" placeholder="Last name" className={styles.input}
            value={lastNameRegister} onChange={(e) => setLastNameRegister(e.target.value)}
            autoComplete="family-name"
          />
          <input
            type="text" placeholder="Email" className={styles.input}
            value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password" placeholder="Password" className={styles.input}
            value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)}
            autoComplete="new-password"
          />
          <input
            type="password" placeholder="Repeat password" className={styles.input}
            value={repeatPasswordRegister} onChange={(e) => setRepeatPasswordRegister(e.target.value)}
            autoComplete="new-password"
          />

          {/* --- SEKCJA OSOBOWOŚCI --- */}
          <div className={styles.personalitySection}>
            <div className={styles.personalityHeader}>
                <span className={styles.personalityLabel}>Typ osobowości:</span>
                <Button 
                    type="link" 
                    icon={<QuestionCircleOutlined />} 
                    onClick={() => setQuizVisible(true)}
                    style={{ padding: 0, color: '#58a6ff' }}
                >
                    Nie wiesz? Rozwiąż ankietę
                </Button>
            </div>
            
            <Select
                placeholder="Wybierz swój typ"
                style={{ width: '100%', height: '45px' }}
                value={personalityType}
                onChange={handleManualSelection}
                className="custom-select"
            >
                {Object.keys(PERSONALITY_PRESETS).map(type => (
                    <Option key={type} value={type}>{type}</Option>
                ))}
            </Select>

            {footballProfile && (
                <div className={styles.footballProfileText}>
                    Twój profil piłkarski: <strong className={styles.footballProfileHighlight}>{footballProfile}</strong>
                </div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;