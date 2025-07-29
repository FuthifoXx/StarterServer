const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.post('/api/v1/blogs', createBlog);
// app.get('/api/v1/blogs', getAllBlogs);
// app.get('/api/v1/blogs/:id', getBlog);

// app.patch('/api/v1/blogs/id', updateBlog);
// app.delete('/api/v1/blogs/:id', deleteBlog);

//Routes
// const blogRouter = express.Router();
// const userRouter = express.Router();

// blogRouter.route('/').get(getAllBlogs).post(createBlog);
// blogRouter.route('/:id').get(getBlog).patch(updateBlog).delete(deleteBlog);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
