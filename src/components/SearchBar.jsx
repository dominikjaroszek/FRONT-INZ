import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { AutoComplete } from "antd";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../axiosInstance";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/search?q=${value}`
      );
      const suggestions = response.data.map((item) => ({
        value: item?.name,
        key: `${item?.name}-${item?.type}`,
        type: item?.type,
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={item?.logo}
              alt={item?.name}
              style={{ width: "20px", height: "20px" }}
            />
            <p>{item?.name}</p>
          </div>
        ),
      }));
      setOptions(suggestions);
    } catch (error) {
      console.error("Błąd podczas pobierania sugestii:", error);
    }
  };

  const handleSelect = (value, option) => {
    const selectedOption = options.find((opt) => opt?.value === value);
    onSearch({ value, type: selectedOption?.type });
  };

  const handleSearch = (value) => {
    setQuery(value);
    if (value) {
      fetchSuggestions(value);
    } else {
      setOptions([]);
    }
  };
  return (
    <div>
      <AutoComplete
        style={{ width: 200 }}
        options={options}
        placeholder="Search..."
        filterOption={true}
        onSearch={handleSearch}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default SearchBar;
