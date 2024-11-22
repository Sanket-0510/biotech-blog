import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import '../styles/createpost.css'; // Import your custom CSS file
import Navbar from "./Navbar"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
  const navigation = useNavigate()
  const [post, setPost] = useState({
    title: '',
    readTime: '',
    description: '',
    content: '',
    tags: [],
  });

  // Define a handler for when the content in the editor changes
  const handleDescriptionChange = (value) => {
    setPost({ ...post, content: value });
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setPost({ ...post, tags });
  };

  const handleSubmit = async() => {
    const token = localStorage.getItem('token')
    const res = await axios.post(`${process.env.REACT_APP_URL}/post/publish`, post, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    if(res) navigation("/")
  };

  return (
    <>
     <Navbar></Navbar>
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="title-input"
        />
      </div>
      <div className="form-group">
        <label>Read Time (in minutes):</label>
        <input
          type="number"
          value={post.readTime}
          onChange={(e) => setPost({ ...post, readTime: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          className="description-input"
        />
      </div>
      <div className="form-group">
        <label>Content:</label>
        <ReactQuill
          value={post.content}
          onChange={handleDescriptionChange}
          className="description-editor"
        />
      </div>
      <div className="form-group">
        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={post.tags.join(',')}
          onChange={handleTagChange}
          className="tags-input"
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
    </>
  );
};

export default CreatePost;
