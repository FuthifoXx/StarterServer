const express = require('express');
const postController = require('../controllers/blogController');
const { protect } = require('../middleware/protect');
const upload = require('../middleware/upload');

const router = express.Router();

// router.param('id', postController.checkID);

router
  .route('/')
  .get(postController.getAllBlogs)
  .post(protect, upload.single('image'), postController.createBlog);

router
  .route('/:id')
  .get(postController.getBlog)
  .patch(protect, postController.updateBlog)
  .delete(protect, postController.deleteBlog);

module.exports = router;
