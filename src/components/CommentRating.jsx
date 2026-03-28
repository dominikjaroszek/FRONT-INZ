import React, { useEffect, useState } from "react";
import { message, Spin, Modal, Button } from "antd";
import { axiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import StarRating from "./StarRating";
import styles from "./Rating.module.css";

const CommentRating = ({ match_id, onRatingSuccess }) => {
  const { auth } = useAuth();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get("/ratings/my-rating/", {
          params: { match_id: match_id },
        });
        setComment(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setComment(null);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (match_id) fetchComments();
  }, [match_id]);

  const handleRatingSubmit = async (rating) => {
    setLoading(true);
    try {
      let response;

      if (comment?.id) {
        response = await axiosPrivate.patch(
          "/ratings/my-rating/",
          { rating: rating }, // body
          { params: { match_id: match_id } } 
        );
        message.success("Your rating has been updated!");
      } else {
        response = await axiosPrivate.post("/ratings/", {
          match: match_id, 
          rating: rating,
        });
        message.success("Your rating has been saved!");
      }

      setComment(response.data);

      if (onRatingSuccess) onRatingSuccess();

    } catch (err) {
      console.error(err);
      if (err.response?.data?.detail) {
        message.error(err.response.data.detail);
      } else {
        message.error("An error occurred while saving the rating.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRatingDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete your rating?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await axiosPrivate.delete("/ratings/my-rating/", {
            params: { match_id: match_id },
          });
          
          setComment(null);
          message.success("The rating has been deleted.");

          if (onRatingSuccess) onRatingSuccess();

        } catch (err) {
          console.error(err);
          message.error("An error occurred while deleting the rating.");
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
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Your rating:
          </div>
          
          <StarRating
            onSubmit={handleRatingSubmit}
            initialValue={comment?.rating || 0}
          />
          
          <Button
            type="primary"
            danger
            onClick={handleRatingDelete}
            style={{ marginTop: "15px" }}
          >
            Delete rating
          </Button>
        </div>
      ) : (
        <div className={styles.Rating}>
          <div style={{ marginBottom: "10px" }}>
            Rate your recent experience.
          </div>
          <StarRating onSubmit={handleRatingSubmit} />
        </div>
      )}
    </div>
  );
};

export default CommentRating;