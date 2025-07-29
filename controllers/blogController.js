const blogs = ['futhi', 'Tshabalala'];

exports.getBlog = (req, res) => {
  const blog = blogs.find((el) => el.id === id);

  if (!blog) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

exports.getAllBlogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs: blogs,
    },
  });
};

exports.createBlog = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

exports.updateBlog = (req, res) => {
  if (req.params.id * 1 > blogs.length) {
    return res.status(404).json({
      status: 'fail',
      message: '<Invalid ID>',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated blogs>',
    },
  });
};

exports.deleteBlog = (req, res) => {
  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'fail',
      message: '<None to delete>',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
