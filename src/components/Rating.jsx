import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import CommentRating from "./CommentRating";
import styles from "./Rating.module.css";
import noawatar from "../assets/noawatar.png";

const Rating = ({ match_id }) => {
  const { auth } = useAuth();

  const {
    data: comments,
    loading,
    error,
  } = useFetch(`/matchRating/${match_id}`);

  const {
    data: average,
    loadingAverage,
    errorAverage,
  } = useFetch(`/matchRating/avg/${match_id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (loadingAverage) return <p>Loading...</p>;
  if (errorAverage) return <p>Error: {errorAverage.message}</p>;

  return (
    <div className={styles.container}>
      {!comments.length ? (
        <div className={styles.title}>Brak komentarzy do wyświetlenia</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.title}>Komentarze do meczu</div>
            <div className={styles.average}>Średnia {average}</div>
          </div>
          <div>
            {comments.map((item, index) => (
              <div key={index} className={styles.comment}>
                <img style={{ width: "80px", height: "80px" }} src={noawatar} />
                <div className={styles.commentContent}>
                  {item.user} ocenił mecz na
                  <Rate value={item.rating} disabled />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {auth?.accessToken ? (
        <CommentRating match_id={match_id} />
      ) : (
        <div className={styles.title}>Zaloguj się, aby dodać komentarz</div>
      )}
    </div>
  );
};

export default Rating;
