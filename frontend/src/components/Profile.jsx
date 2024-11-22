import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import axios from 'axios';
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin'); 
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]); 

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2>User Profile</h2>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            
          
          <h2>Premium Status</h2>
           {
            !user.premium?(
              <p>BUY PREMIUM : <button onClick={()=>navigate("/payment")}>BUY</button></p>
            ): <p>PREMIUM</p>
          }
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
       
       
      </div>
    </div>
  );
};

export default Profile;
