import React, { useState, useEffect } from "react";
import { Rate, Button, message } from "antd";
import styles from "./Rating.module.css";

const StarRating = ({ initialValue = 0, onSubmit }) => {
  const [rating, setRating] = useState(initialValue); // Current rating value
  const [loading, setLoading] = useState(false); // Loading state

  // Set the initial rating value if provided
  useEffect(() => {
    setRating(initialValue);
    console.log(initialValue);
  }, [initialValue]);

  // Handle rating submission
  const handleSubmit = async () => {
    if (rating === 0) {
      message.warning("Please select a number of stars before submitting!");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(rating); // Call the onSubmit function passed as props
    } catch (error) {
      message.error("An error occurred while submitting your rating.");
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
          {initialValue > 0 ? "Update Rating" : "Submit Rating"}
        </Button>
      </div>
    </div>
  );
};

export default StarRating;
