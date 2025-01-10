import React, { useState, useEffect } from "react";
import { Rate, Button, message } from "antd";
import styles from "./Rating.module.css";

const StarRating = ({ initialValue = 0, onSubmit }) => {
  const [rating, setRating] = useState(initialValue); // Aktualna wartość oceny
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Ustawienie początkowej wartości oceny, jeśli jest przekazana
  useEffect(() => {
    setRating(initialValue);
    console.log(initialValue);
  }, [initialValue]);

  // Funkcja obsługi wysyłania oceny
  const handleSubmit = async () => {
    if (rating === 0) {
      message.warning("Wybierz liczbę gwiazdek przed wysłaniem!");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(rating); // Wywołanie funkcji onSubmit przekazanej z propsów
    } catch (error) {
      message.error("Wystąpił błąd podczas wysyłania oceny.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Rate
        value={rating}
        onChange={(value) => setRating(value)}
        style={{ fontSize: "24px" }}
      />
      <div>
        <Button
          type="primary"
          style={{ background: "#141619" }}
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
        >
          {initialValue > 0 ? "Zaktualizuj ocenę" : "Wyślij ocenę"}
        </Button>
      </div>
    </div>
  );
};

export default StarRating;
