const marked = require('marked')
const hljs = require('highlight.js')
const config = require('../config')

marked.setOptions({
  highlightClass: 'hljs',
  highlight: (code) => hljs.highlightAuto(code).value
})

exports.markedWithHighlight = marked

exports.defaultPost = {
  author: config.author,
  categories: [
    {
      type: 'default',
      name: 'default'
    }
  ]
}
