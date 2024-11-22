import React, { useState } from 'react';
import '../styles/postcard.css'
function PostCard({ post }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="post" key={post._id}>
      <p className="post-content">{post.content}</p>
      <div className="like-comment-container">
        <div className="comment-section">
          <h3>Comments:</h3>
          <div className="comment-list">
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
          <div className="comment-input" style={{width:'300px'}}>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={handleCommentChange}
            />
            <button onClick={handleAddComment}>Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
