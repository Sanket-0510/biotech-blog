import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';

const SavedList = () => {
  const [savedItems, setSavedItems] = useState([]);
  // Initialize the navigation object
   const navigation = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the token is available, if not, redirect to '/signin'
    if (!token) {
      // Use navigate to redirect
      navigation("/signin")
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${process.env.REACT_APP_URL}/savedList`, config)
      .then((response) => {
        setSavedItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching saved items:', error);
      });
  }, [navigation]); // Include navigation in the dependency array

  return (
    <div>
      <Navbar />
      <h2>Saved List</h2>
      <ul>
        {savedItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedList;
