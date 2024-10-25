const express = require('express');
const router = express.Router();

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

// Get all posts
router.get('/', (req, res) => {
  res.json(data.posts);
});

// Add a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: data.posts.length + 1,
    title,
    content,
    comments: []
  };
  data.posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = data.posts.find(p => p.id === parseInt(id));
  
  if (post) {
    post.title = title;
    post.content = content;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Delete a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = data.posts.findIndex(p => p.id === parseInt(id));
  
  if (postIndex !== -1) {
    data.posts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

module.exports = router;
