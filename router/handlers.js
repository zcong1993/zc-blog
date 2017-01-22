const getPosts = require('../utils/mock').getPosts
const schemas= require('../schemas/index')
const mongoose = require('mongoose')
const config = require('../config')

const Post = schemas.Post

exports.index = (req, res, next) => {
  const page = parseInt(req.params.id) || 1
  Post.getCount()
    .then(num => {
        Post.getPostsByPage(page)
        .then((posts) => {
          if (posts.length) {
            num = Math.ceil(num / config.postsPerPage)
            const opts = {
              isFirst: page === 1,
              isLast: page === num,
              pastUrl: `/home/${page + 1}`,
              newUrl: `/home/${page - 1}`
            }
            res.render('index', {posts, page, opts})
          } else {
            next(new Error('no posts here!'))
          }
        })
    })
    .catch((err) => res.send(err))
}

exports.post = (req, res, next) => {
  Post.findById(req.params.id)
    .then((posts) => {
      const post = posts[0]
      res.render('details', {post})
    })
    .catch(() => next(new Error('no post here')))
}

exports.category = (req, res, next) => {
  const cate = req.params.category
  Post.findByCategory(cate)
    .then((posts) => res.render('category', {posts, cate}))
    .catch(() => next(new Error('no such category')))
}

exports.insert = (req, res) => {
  // console.log(req.body.post)
  // return res.send('test')
  const postData = getPosts(1)
  const post = new Post(Object.assign({}, postData[0], req.body.post))
  post.save()
    .then(() => res.send('success'))
    .catch((err) => res.send(err))
}

exports.input = (req, res) => {
  res.render('input')
}

exports.show = (req, res, next) => {
  Post.getPostsByPage(2)
    // .then((posts) => res.json(posts))
    .then(() => next(new Error('test')))
}

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500)
    res.send({error: err.message})
  }
}

exports.notFoundHandler = (req, res, next) => {
  res.status(404)

  if (req.accepts('html')) {
    res.render('404', {url: req.url})
    return
  }

  if (req.accepts('json')) {
    res.send({error: 'Not Found'})
    return
  }

  res.type('txt').send('Not Found')
}
