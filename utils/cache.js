const LRU = require('lru-cache')

const options = {
  max: 1000,
  maxAge: 1000 * 60 * 60 * 24 // 24 h
}

module.exports = LRU(options)
