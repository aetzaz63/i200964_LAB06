const express = require('express');
const router = express.Router({ mergeParams: true });

let data = {
  posts: [
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      comments: [
        { id: 1, text: "First comment" },
        { id: 2, text: "Second comment" },
        { id: 3, text: "Third comment" },
      ],
    },
  ],
};

// Get all comments for a post
router.get('/', (req, res) => {
  const { postId } = req.params;
  const post = data.posts.find(p => p.id === parseInt(postId));
  
  if (post) {
    res.json(post.comments);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Add a new comment to a post
router.post('/', (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const post = data.posts.find(p => p.id === parseInt(postId));
  
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      text
    };
    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Update a comment
router.put('/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  const post = data.posts.find(p => p.id === parseInt(postId));
  
  if (post) {
    const comment = post.comments.find(c => c.id === parseInt(commentId));
    if (comment) {
      comment.text = text;
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Delete a comment
router.delete('/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const post = data.posts.find(p => p.id === parseInt(postId));
  
  if (post) {
    const commentIndex = post.comments.findIndex(c => c.id === parseInt(commentId));
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

module.exports = router;
