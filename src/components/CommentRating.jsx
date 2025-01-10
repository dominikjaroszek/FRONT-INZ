import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { axiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import StarRating from "./StarRating";
import { Button } from "antd";
import styles from "./Rating.module.css";

const CommentRating = ({ match_id }) => {
  const { auth } = useAuth();
  const [comment, setComment] = useState(); // Przechowywanie obecnej oceny
  const [loading, setLoading] = useState(true); // Stan ładowania

  // Pobranie oceny użytkownika dla meczu
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/matchRating/user/${match_id}`
        );
        console.log(response.data);
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
    try {
      const response = comment?.rating
        ? await axiosPrivate.patch(`/matchRating`, { match_id, rating }) // Aktualizacja oceny
        : await axiosPrivate.post("/matchRating", { match_id, rating }); // Nowa ocena

      setComment(response.data); // Zaktualizuj stan z odpowiedzi API
      message.success("Twoja ocena została zapisana!");
    } catch (err) {
      console.error(err);
      message.error("Wystąpił błąd podczas zapisywania oceny.");
    }
    window.location.reload();
  };

  const handleRatingDelete = async () => {
    try {
      await axiosPrivate.delete(`/matchRating/user/${match_id}`);
      setComment(null);
      message.success("Ocena została usunięta.");
    } catch (err) {
      console.error(err);
      message.error("Wystąpił błąd podczas usuwania oceny.");
    }
    window.location.reload();
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
      {comment.rating ? (
        <div className={styles.Rating}>
          <div>Twoja ocena: </div>
          {!loading && (
            <StarRating
              onSubmit={handleRatingSubmit}
              initialValue={comment?.rating || 0}
            />
          )}
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
