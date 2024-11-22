import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [action, setAction] = useState(true);
  const [comments, setComments] = useState({}); 

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${process.env.REACT_APP_URL}/post/getAllPosts`, { headers });
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle the error, show a message to the user, etc.
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [action]);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle unauthenticated user (redirect to login, show a message, etc.)
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(`http://${process.env.REACT_APP_URL}:9001/post/${postId}/like`, null, { headers });
      setAction(!action);
    } catch (e) {
      console.log(e);
    }
  };


  const handleComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (comments[postId]?.trim() === '') {
        // Validate and sanitize the comment
        console.error("Comment cannot be empty");
        // You might want to show a message to the user.
        return;
      }

      await axios.post(`http://${process.env.REACT_APP_URL}:9001/post/${postId}/comment`, { data: comments[postId] }, { headers });
      setComments({ ...comments, [postId]: '' }); // Clear the comment for the specific post
      setAction(!action);
    } catch (e) {
      console.log(e);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <Link to="/createPost" className="create-post-button">
          <button className="plus-button">+</button>
        </Link>
        <h2>Posts</h2>
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <p className="post-content">{post.content}</p>
              comments:
              {post.comments.map((comment) => (
                <div key={comment.user_id} >
                  <p>{comment.user_name}</p>
                  <p>{comment.comment}</p>
                </div>
              ))}
              <div className="like-comment">
                <button
                  style={{ width: "2vw", borderRadius: "20%" }}
                  onClick={() => handleLike(post._id)}
                >
                  &hearts; {post.likes.length}
                </button>
                <input
                  type="text"
                  value={comments[post._id] || ''} 
                  onChange={(e) => setComments({ ...comments, [post._id]: e.target.value })}
                />
                <button className="like-comment-button" onClick={() => handleComment(post._id)}>
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
