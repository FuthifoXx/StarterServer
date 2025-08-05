const express = require('express');

const postController = require('../controllers/blogController');

const router = express.Router();

// router.param('id', postController.checkID);

router
  .route('/')
  .get(postController.getAllBlogs)
  .post(postController.createBlog);

router
  .route('/:id')
  .get(postController.getBlog)
  .patch(postController.updateBlog)
  .delete(postController.deleteBlog);

module.exports = router;
