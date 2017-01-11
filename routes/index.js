const getPosts = require('../schemas/mock').getPosts

exports.index = (req, res) => {
  const posts = getPosts(4)
  res.render('index', {posts})
}
