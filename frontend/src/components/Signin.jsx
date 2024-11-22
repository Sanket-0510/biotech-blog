import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/signin.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate()
  const handleSignIn = async () => {
    try {
      const payload = { email, password };
      const response = await axios.post(`${process.env.REACT_APP_URL}/signin`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(payload),
      });

      if (response) {
        const  token  = response.data.token
        if (token) navigation("/")
        localStorage.setItem('token', token);
      } else {
        console.error('Sign-in failed:', response.statusText);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };



return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-form">
          <h2>Sign In</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
            <p>
              Don't have an account?{' '}
              <Link to="/signup">Sign Up</Link> {/* Link to the signup route */}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
