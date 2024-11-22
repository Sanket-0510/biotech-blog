import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    navigation("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    navigation("/profile")
    setIsDropdownOpen(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/savedList">SavedList</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          {token ? (
            // If token is present, show user icon and dropdown
            <div className="user-dropdown">
              <div onClick={toggleDropdown} className="user-icon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={closeDropdown}>User</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          ) : (
            // If no token, show "Sign In" link
            <Link to="/signin">Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
