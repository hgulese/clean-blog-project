const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post.js');

const app = express();

//* connect DB
mongoose.connect('mongodb://127.0.0.1:27017/clean-blog-db');

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts
  });
});

app.get('/posts/:id', async (req, res) => {
  // res.render('about');

  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});