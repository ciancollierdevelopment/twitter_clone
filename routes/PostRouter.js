const express = require('express');
const PostRouter = express.Router();
const Post = require('../models/Post');
const isLoggedIn = require('../helpers/isLoggedIn');

PostRouter.post('/newpost', async (req, res) => {
  const username = isLoggedIn(req, res);
  const {content} = req.body;
  let error = true;

  if (username) {
    if (content) {
      let new_post = new Post({
        user: username,
        content: content,
        time: Date.now()
      });

      const post_success = await new_post.save();

      if (post_success) {
        error = false;
      }
    }
  }

  res.json({error: error});
});

PostRouter.post('/getpostsusername', async (req, res) => {
  const {usernames, number_to_return} = req.body;
  let error = true;
  let posts = [];
  let counter = 0;

  if (isLoggedIn(req, res)) {
    error = false;

    for (let k = 0; k < usernames.length; k++) {
      const users_posts = await Post.find({user: usernames[k]}, null, {limit: number_to_return});

      if (users_posts) {
        posts = posts.concat(users_posts);
      }
    }
  }

  posts.sort(function(a, b) {
    a = new Date(a.time);
    b = new Date(b.time);
    return a>b ? -1 : a<b ? 1 : 0;
  });

  res.json({error: error, posts: posts});
});

module.exports = PostRouter;
