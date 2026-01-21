import React, { useState } from "react"; // 1. Dodaj useState
import { Rate } from "antd";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import CommentRating from "./CommentRating";
import styles from "./Rating.module.css";
import noawatar from "../assets/noawatar.png";

const Rating = ({ match_id }) => {
  const { auth } = useAuth();

  // 2. Stan służący do wymuszania odświeżenia
  const [refreshKey, setRefreshKey] = useState(0);

  // 3. Funkcja, którą przekażemy do dziecka
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // 4. Dodajemy parametr 'refresh' do URL-i. 
  // Zmiana 'refreshKey' zmieni URL, więc useFetch pobierze dane ponownie.
  
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
    <div className={styles.container}>
      {!comments || comments.length === 0 ? (
        <div className={styles.title}>No comments yet</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.title}>Match comments:</div>
            <div className={styles.average}>Average: {numericAverage} / 5</div>
          </div>
          <div>
            {comments.map((item, index) => (
              <div key={index} className={styles.comment}>
                <img
                  style={{ width: "80px", height: "80px" }}
                  src={noawatar}
                  alt="avatar"
                />
                <div className={styles.commentContent}>
                  <div style={{ fontWeight: "bold" }}>{item.user_name}</div>
                  <div>rated the match:</div>
                  <Rate value={item.rating} disabled />
                  {item.comment && <p>{item.comment}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {auth?.accessToken ? (
        // 5. Przekazujemy funkcję odświeżającą do dziecka
        <CommentRating 
            match_id={match_id} 
            onRatingSuccess={handleRefresh} 
        />
      ) : (
        <div className={styles.title} style={{ marginTop: "20px" }}>
          Sign in to add a comment
        </div>
      )}
    </div>
  );
};

export default Rating;