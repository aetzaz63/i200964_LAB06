const express = require('express');
const app = express();
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/posts', postRoutes);
app.use('/posts/:postId/comments', commentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
