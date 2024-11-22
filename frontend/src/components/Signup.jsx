import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigation = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userData = {
        name,
        email,
        about,
        twitter,
        facebook,
        linkedin,
        password,
      };

      const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, userData);


      if (response) {
        // Handle successful signup, e.g., navigate to the user's profile page
        console.log(response)
        navigation("/signin")
        console.log("signup successfull")

      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
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
              <label>About:</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="form-group">
              <label>Twitter:</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter URL"
              />
            </div>
            <div className="form-group">
              <label>Facebook:</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook URL"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn:</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL"
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
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
