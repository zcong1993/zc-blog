const getPosts = require('../utils/mock').getPosts
const schemas= require('../schemas/index')
const mongoose = require('mongoose')

const Post = schemas.Post


exports.index = (req, res) => {
  // const posts = getPosts(4)
  // res.render('index', {posts})
  Post.test(req.params.id || 1)
    .then((posts) => {
      // console.log(posts)
      res.render('index', {posts})
    })
    .catch((err) => res.send(err))
}

exports.insert = (req, res) => {
  const postData = getPosts(1)
  const post = new Post(postData[0])
  post.save()
    .then(() => res.send('success'))
    .catch((err) => res.send(err))
}

exports.show = (req, res, next) => {
  Post.test(2)
    // .then((posts) => res.json(posts))
    .then(() => next(new Error('test error')))
  // post.test()
  //   .then((data) => res.send(data))
  //   .catch(err => res.send(err))
  // Post.find()
  //   .then((posts) => res.send(posts))
}

exports.errorHandler = (req, res, err) => {
  if (err) {
    res.send(err.message)
  }
}
