const Blog = require('../models/blogModel');

exports.getBlog = async (req, res) => {
  // const blog = blogs.find((el) => el.id === id);
  try {
    const blog = await Blog.findById(req.params.id);
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
    const blogs = await Blog.find();

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
      message: 'error',
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        blog: newBlog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error',
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      validators: true,
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
