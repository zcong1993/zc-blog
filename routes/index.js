const getPosts = require('../utils/mock').getPosts
const schemas= require('../schemas/index')
const mongoose = require('mongoose')

const postSchema = schemas.postSchema
const Post = mongoose.model('Post', postSchema)

exports.index = (req, res) => {
  // const posts = getPosts(4)
  // res.render('index', {posts})
  Post.find()
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

exports.show = (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
}
