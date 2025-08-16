const Blog = require('../models/blogModel');

exports.getBlog = async (req, res) => {
  // const blog = blogs.find((el) => el.id === id);
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'author',
      'name email',
    );

    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'No blog found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'error',
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    // 1. Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Build query
    let query = Blog.find(queryObj);

    // 2. Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const blogs = await query;

    res.status(200).json({
      status: 'success',
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const blog = await Blog.create({
      title,
      subtitle,
      content,
      author: req.user.id,
      imageUrl,
    });

    res.status(201).json({
      status: 'success',
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error',
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(204).json({
      status: 'fail',
      message: 'error',
    });
  }
};
