import React, { useState } from 'react';
import './NestedComments.css';

const NestedComments = () => {
  const [comments, setComments] = useState([{ id: 1, text: 'First post!', replies: [{ id: 2, text: 'Replying to first', replies: [] }] }]);
  
  const CommentNode = ({ comment }) => (
    <div className="comment-node">
      <p>{comment.text}</p>
      <button>Reply</button>
      <div className="replies">
        {comment.replies.map(r => <CommentNode key={r.id} comment={r} />)}
      </div>
    </div>
  );

  return (
    <div className="nestedcomments-container">
      <h2>Nested Comments</h2>
      {comments.map(c => <CommentNode key={c.id} comment={c} />)}
    </div>
  );
};
export default NestedComments;
