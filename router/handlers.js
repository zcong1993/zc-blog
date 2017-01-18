const getPosts = require('../utils/mock').getPosts
const schemas= require('../schemas/index')
const mongoose = require('mongoose')

const Post = schemas.Post


exports.index = (req, res, next) => {
  Post.test(req.params.id || 1)
    .then((posts) => {
      if (posts.length) {
        res.render('index', {posts})
      } else {
        next(new Error('no posts here!'))
      }

    })
    .catch((err) => res.send(err))
}

exports.post = (req, res, next) => {
  Post.findById(req.params.id || '')
    .then((post) => res.json(post))
    .catch(() => next(new Error('no post here')))
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
    .then(() => next(new Error('test')))
  // post.test()
  //   .then((data) => res.send(data))
  //   .catch(err => res.send(err))
  // Post.find()
  //   .then((posts) => res.send(posts))
}

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    res.send(err.message)
  }
}
