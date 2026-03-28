import React, { useState } from "react";
import { Modal, Typography, Row, Col, Progress, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { calculateQuizStats, FOOTBALL_PROFILE_MAP } from "../../utils/personalityConfig";
import styles from "./PersonalityQuiz.module.css"; // Dodajemy import stylów

const { Title, Text } = Typography;

const questions = [
  {
    id: 1,
    question: "Jak najchętniej 'ładujesz baterie' po ciężkim tygodniu?",
    answers: [
      { type: "Konfrontator", text: "Muszę 'wyrzucić' z siebie energię – idę na intensywny trening." },
      { type: "Stabilizator", text: "Potrzebuję napięcia, ale w kontrolowany sposób – np. grając w gry." },
      { type: "Analityk", text: "Potrzebuję wyciszenia i porządku – czytam, planuję." },
      { type: "Poszukiwacz Doznań", text: "Potrzebuję silnych bodźców – impreza, koncert." },
    ],
  },
  {
    id: 2,
    question: "Który gatunek filmowy sprawia Ci największą satysfakcję?",
    answers: [
      { type: "Konfrontator", text: "Surowy film wojenny lub dokument o sportach walki." },
      { type: "Stabilizator", text: "Thriller szpiegowski lub dramat sądowy." },
      { type: "Analityk", text: "Złożony dramat psychologiczny lub analityczne Sci-Fi." },
      { type: "Poszukiwacz Doznań", text: "Dynamiczny film akcji lub widowiskowy fantasy." },
    ],
  },
  {
    id: 3,
    question: "Co jest dla Ciebie najbardziej frustrujące w codziennym życiu?",
    answers: [
      { type: "Konfrontator", text: "Unikanie konfrontacji, 'owijanie w bawełnę'." },
      { type: "Stabilizator", text: "Poczucie utraty kontroli, chaos." },
      { type: "Analityk", text: "Nielogiczny system marnujący czas." },
      { type: "Poszukiwacz Doznań", text: "Nuda, rutyna, powtarzalność." },
    ],
  },
  {
    id: 4,
    question: "Jak podchodzisz do rozwiązywania złożonego problemu?",
    answers: [
      { type: "Konfrontator", text: "Działam od razu, uczę się w boju." },
      { type: "Stabilizator", text: "Najpierw zabezpieczam tyły i analizuję ryzyko." },
      { type: "Analityk", text: "Tworzę plan, analizuję zmienne, działam metodycznie." },
      { type: "Poszukiwacz Doznań", text: "Traktuję to jak wyzwanie, dynamicznie reaguję." },
    ],
  },
  {
    id: 5,
    question: "Jakie gry preferujesz?",
    answers: [
      { type: "Konfrontator", text: "Rywalizacyjne, walka (siła i refleks)." },
      { type: "Stabilizator", text: "Przetrwanie, skradanki (napięcie, unikanie błędów)." },
      { type: "Analityk", text: "Strategiczne, symulacyjne (planowanie)." },
      { type: "Poszukiwacz Doznań", text: "Wyścigowe, imprezowe (dynamika, zabawa)." },
    ],
  },
  {
    id: 6,
    question: "Twój styl jazdy samochodem / poruszania się:",
    answers: [
      { type: "Konfrontator", text: "Asertywny, dynamiczny." },
      { type: "Stabilizator", text: "Defensywny, bezpieczny." },
      { type: "Analityk", text: "Precyzyjny, ekonomiczny." },
      { type: "Poszukiwacz Doznań", text: "Ekspresyjny, szybki." },
    ],
  },
  {
    id: 7,
    question: "Kiedy uczysz się obsługi nowego urządzenia:",
    answers: [
      { type: "Konfrontator", text: "Metoda prób i błędów." },
      { type: "Stabilizator", text: "Sprawdzam, czego nie robić, by nie zepsuć." },
      { type: "Analityk", text: "Czytam całą instrukcję." },
      { type: "Poszukiwacz Doznań", text: "Sprawdzam tylko najciekawsze funkcje." },
    ],
  },
  {
    id: 8,
    question: "Aktywność fizyczna:",
    answers: [
      { type: "Konfrontator", text: "Sporty walki, Crossfit, rywalizacja." },
      { type: "Stabilizator", text: "Wspinaczka, joga, kontrola ciała." },
      { type: "Analityk", text: "Biegi, golf, strategia i powtarzalność." },
      { type: "Poszukiwacz Doznań", text: "Narty, gry zespołowe, adrenalina." },
    ],
  },
  {
    id: 9,
    question: "Co jest ważniejsze w zespole?",
    answers: [
      { type: "Konfrontator", text: "Wola walki i serce." },
      { type: "Stabilizator", text: "Niezawodność i brak błędów." },
      { type: "Analityk", text: "Perfekcyjna organizacja." },
      { type: "Poszukiwacz Doznań", text: "Energia i chemia między ludźmi." },
    ],
  },
  {
    id: 10,
    question: "Idealny urlop to:",
    answers: [
      { type: "Konfrontator", text: "Szkoła przetrwania, wyzwanie fizyczne." },
      { type: "Stabilizator", text: "Bezpieczny resort all-inclusive." },
      { type: "Analityk", text: "Zwiedzanie z przewodnikiem, zdobywanie wiedzy." },
      { type: "Poszukiwacz Doznań", text: "Spontaniczny backpacking, przygoda." },
    ],
  },
];

const PersonalityQuiz = ({ visible, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [history, setHistory] = useState([]); 
  
  const [scores, setScores] = useState({
    "Konfrontator": 0,
    "Stabilizator": 0,
    "Analityk": 0,
    "Poszukiwacz Doznań": 0,
  });

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    setHistory([...history, type]);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 150);
    } else {
      finishQuiz(newScores);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
        const lastChoice = history[history.length - 1];
        if (lastChoice) {
            setScores(prev => ({
                ...prev,
                [lastChoice]: prev[lastChoice] - 1
            }));
        }
        setHistory(prev => prev.slice(0, -1));
        setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = (finalScores) => {
    const winnerType = Object.keys(finalScores).reduce((a, b) => 
      finalScores[a] > finalScores[b] ? a : b
    );
    
    const calculatedStats = calculateQuizStats(finalScores, questions.length);
    const footballName = FOOTBALL_PROFILE_MAP[winnerType];

    setTimeout(() => {
        setCurrentQuestion(0);
        setScores({ "Konfrontator": 0, "Stabilizator": 0, "Analityk": 0, "Poszukiwacz Doznań": 0 });
        setHistory([]);
    }, 500);

    onComplete({
        type: winnerType,
        footballProfile: footballName,
        stats: calculatedStats
    });
  };

  const question = questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      maskClosable={false}
      className={styles.darkModal} // Ważne: nakłada na modala ciemne style
    >
      <div className={styles.quizWrapper}>
        
        <div className={styles.navigationBar}>
            <div style={{ width: '80px' }}>
                {currentQuestion > 0 && (
                    <Button 
                        icon={<ArrowLeftOutlined />} 
                        onClick={handleBack}
                        type="text"
                        className={styles.backBtn}
                    >
                        Wróć
                    </Button>
                )}
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                 <div className={styles.questionCounter}>
                    Pytanie {currentQuestion + 1} z {questions.length}
                </div>
            </div>
            <div style={{ width: '80px' }}></div>
        </div>

        <div style={{ marginBottom: '40px', padding: '0 10px' }}>
            {/* trailColor zmienia tło niezapełnionego paska, strokeColor zmienia zapełniony na nasz niebieski */}
            <Progress percent={progressPercent} showInfo={false} strokeColor="#58a6ff" trailColor="#2a2e35" />
        </div>

        <Title level={3} className={styles.questionTitle}>
            {question.question}
        </Title>

        <Row gutter={[16, 16]}>
          {question.answers.map((answer, index) => (
            <Col xs={24} sm={12} key={index}>
              <div 
                className={styles.answerCard}
                onClick={() => handleAnswer(answer.type)}
              >
                 <div className={styles.answerText}>{answer.text}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  );
};

export default PersonalityQuiz;