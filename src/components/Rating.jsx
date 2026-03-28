import React, { useState } from "react";
import { Rate } from "antd";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import CommentRating from "./CommentRating";
import styles from "./Rating.module.css";
import noawatar from "../assets/noawatar.png";

const Rating = ({ match_id }) => {
  const { auth } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const {
    data: comments,
    loading: loadingComments,
    error: errorComments,
  } = useFetch(`/ratings/?match__api_id=${match_id}&refresh=${refreshKey}`);

  const {
    data: averageData,
    loading: loadingAverage,
    error: errorAverage,
  } = useFetch(`/matches/${match_id}/average-rating/?refresh=${refreshKey}`);

  if (loadingComments || loadingAverage) return <p>Loading...</p>;
  if (errorComments) return <p>Error: {errorComments.message}</p>;
  if (errorAverage) return <p>Error: {errorAverage.message}</p>;

  const numericAverage = averageData?.average_rating || 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {!comments || comments.length === 0 ? (
          <div className={styles.noComments}>No comments yet</div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.title}>Match comments</div>
              <div className={styles.average}>
                Average: <span>{numericAverage} / 5</span>
              </div>
            </div>
            
            <div className={styles.commentList}>
              {comments.map((item, index) => (
                <div key={index} className={styles.comment}>
                  <img
                    className={styles.avatar}
                    src={noawatar}
                    alt="avatar"
                  />
                  <div className={styles.commentContent}>
                    <div className={styles.userName}>{item.user_name}</div>
                    <div className={styles.ratedText}>rated the match:</div>
                    <Rate value={item.rating} disabled className={styles.stars} />
                    {item.comment && (
                      <div className={styles.commentText}>{item.comment}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.actionCard}>
        {auth?.accessToken ? (
          <CommentRating
            match_id={match_id}
            onRatingSuccess={handleRefresh}
          />
        ) : (
          <div className={styles.noAuth}>Sign in to add a comment</div>
        )}
      </div>
    </div>
  );
};

export default Rating;