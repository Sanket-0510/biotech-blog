import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import "../styles/search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Check local storage for previously stored search results
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setSearchResults(JSON.parse(storedResults));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(process.env.REACT_APP_URL)
      if (!token) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/articles`,
        { data: { q: searchQuery } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const articles = response.data.articles;
      setSearchResults(articles);

      // Store the results in local storage
      localStorage.setItem("searchResults", JSON.stringify(articles));
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (error.response) {
        console.error("Full error response:", error.response);
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <h2>Search Results</h2>
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.id} className="search-result">
              <p></p>
              <p className="result-title">
                <a href={result.articleLink} target="_blank" style={{ color: "blue" }}>
                  {result.title}
                </a>
              </p>
              <p className="result-author">Author: {result.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
