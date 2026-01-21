import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import { message, Select, Button, Tooltip } from "antd"; // Dodano Select, Button, Tooltip
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./Register.module.css";
import PersonalityQuiz from "./PersonalityQuiz"; // Import nowego komponentu

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const [nameRegister, setNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [repeatPasswordRegister, setRepeatPasswordRegister] = useState("");
  
  // NOWY STAN: Typ osobowości
  const [personalityType, setPersonalityType] = useState(null);
  // NOWY STAN: Widoczność modala z quizem
  const [quizVisible, setQuizVisible] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // --- Funkcje walidacyjne bez zmian ---
  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one digit.";
    if (!/[.!@#$%^&*(),?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return null;
  };

  // --- Logika Quizu ---
  const handleQuizComplete = (result) => {
    setPersonalityType(result);
    setQuizVisible(false);
    messageApi.success(`Twój wynik to: ${result}. Pole zostało uzupełnione.`);
  };

  const registerAccount = (event) => {
    if (event) event.preventDefault();

    // ... (Twoje istniejące walidacje imienia, nazwiska, emaila, hasła - bez zmian) ...
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

    // NOWA WALIDACJA (Opcjonalna - jeśli pole jest wymagane)
    if (!personalityType) {
        return messageApi.error("Proszę wybrać typ osobowości lub rozwiązać ankietę.");
    }

    axios
      .post("/auth/register/", {
        email: emailRegister,
        first_name: nameRegister,
        last_name: lastNameRegister,
        password: passwordRegister,
        confirm_password: repeatPasswordRegister,
        // PRZEKAZANIE NOWEGO POLA
        personality_type: personalityType, 
      })
      .then(() => {
        messageApi.success("Rejestracja udana! Możesz się teraz zalogować.");
        // Resetowanie stanów
        setNameRegister(""); setLastNameRegister(""); setEmailRegister("");
        setPasswordRegister(""); setRepeatPasswordRegister(""); setPersonalityType(null);
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
      
      {/* Modal z Quizem */}
      <PersonalityQuiz 
        visible={quizVisible} 
        onClose={() => setQuizVisible(false)} 
        onComplete={handleQuizComplete} 
      />

      <div className={styles.backIcon} onClick={() => window.history.back()}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.registerBox}>
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
          <div style={{ marginTop: 15, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>Typ osobowości:</span>
                <Button 
                    type="link" 
                    icon={<QuestionCircleOutlined />} 
                    onClick={() => setQuizVisible(true)}
                    style={{ padding: 0, color: '#1890ff' }}
                >
                    Nie wiesz? Rozwiąż ankietę
                </Button>
            </div>
            
            <Select
                placeholder="Wybierz swój typ"
                style={{ width: '100%', height: '45px' }}
                value={personalityType}
                onChange={(value) => setPersonalityType(value)}
                className="custom-select" // Możesz dodać style jeśli potrzeba
            >
                <Option value="Konfrontator">Konfrontator</Option>
                <Option value="Stabilizator">Stabilizator</Option>
                <Option value="Analityk">Analityk</Option>
                <Option value="Poszukiwacz Doznań">Poszukiwacz Doznań</Option>
            </Select>
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