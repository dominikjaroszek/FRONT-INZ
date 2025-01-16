import React, { useEffect, useState } from "react";
import { message, Spin, Modal, Button } from "antd";
import { axiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import StarRating from "./StarRating";
import styles from "./Rating.module.css";

const CommentRating = ({ match_id }) => {
  const { auth } = useAuth();
  const [comment, setComment] = useState(null); // Store the current rating
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the user's rating for the match
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/matchRating/user/${match_id}`
        );
        setComment(response.data);
      } catch (err) {
        console.error(err);
        message.error("Failed to load the rating.");
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
        ? await axiosPrivate.patch(`/matchRating`, { match_id, rating }) // Update the rating
        : await axiosPrivate.post("/matchRating", { match_id, rating }); // New rating

      setComment(response.data); // Update state with API response
      window.location.reload();
      message.success("Your rating has been saved!");
    } catch (err) {
      console.error(err);
      window.location.reload();
      message.error("An error occurred while saving the rating.");
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
          await axiosPrivate.delete(`/matchRating/user/${match_id}`);
          setComment(null);
          message.success("The rating has been deleted.");
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
          <div>Your rating:</div>
          <StarRating
            onSubmit={handleRatingSubmit}
            initialValue={comment?.rating || 0}
          />
          <Button type="primary" danger onClick={handleRatingDelete}>
            Delete rating
          </Button>
        </div>
      ) : (
        <div className={styles.Rating}>
          <div>Rate your recent experience.</div>
          <StarRating onSubmit={handleRatingSubmit} />
        </div>
      )}
    </div>
  );
};

export default CommentRating;
