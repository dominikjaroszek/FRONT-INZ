import React, { useEffect, useState } from "react";
import { message, Spin, Modal, Button } from "antd";
import { axiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import StarRating from "./StarRating";
import styles from "./Rating.module.css";

const CommentRating = ({ match_id }) => {
  const { auth } = useAuth();
  const [comment, setComment] = useState(null); // Przechowywanie obecnej oceny
  const [loading, setLoading] = useState(true); // Stan ładowania

  // Pobranie oceny użytkownika dla meczu
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/matchRating/user/${match_id}`
        );
        setComment(response.data);
      } catch (err) {
        console.error(err);
        message.error("Nie udało się załadować oceny.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [match_id]);

  const handleRatingSubmit = async (rating) => {
    setLoading(true);
    try {
      const response = comment?.rating
        ? await axiosPrivate.patch(`/matchRating`, { match_id, rating }) // Aktualizacja oceny
        : await axiosPrivate.post("/matchRating", { match_id, rating }); // Nowa ocena

      setComment(response.data); // Zaktualizuj stan z odpowiedzi API
      window.location.reload();
      message.success("Twoja ocena została zapisana!");
      windows;
    } catch (err) {
      console.error(err);
      window.location.reload();
      message.error("Wystąpił błąd podczas zapisywania oceny.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingDelete = () => {
    Modal.confirm({
      title: "Czy na pewno chcesz usunąć swoją ocenę?",
      content: "Tej akcji nie można cofnąć.",
      okText: "Tak, usuń",
      cancelText: "Anuluj",
      onOk: async () => {
        setLoading(true);
        try {
          await axiosPrivate.delete(`/matchRating/user/${match_id}`);
          setComment(null);
          message.success("Ocena została usunięta.");
        } catch (err) {
          console.error(err);
          message.error("Wystąpił błąd podczas usuwania oceny.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container1}>
      {comment?.rating ? (
        <div className={styles.Rating}>
          <div>Twoja ocena:</div>
          <StarRating
            onSubmit={handleRatingSubmit}
            initialValue={comment?.rating || 0}
          />
          <Button type="primary" danger onClick={handleRatingDelete}>
            Usuń ocenę
          </Button>
        </div>
      ) : (
        <div className={styles.Rating}>
          <div>Oceń swoje niedawne doświadczenia.</div>
          <StarRating onSubmit={handleRatingSubmit} />
        </div>
      )}
    </div>
  );
};

export default CommentRating;
