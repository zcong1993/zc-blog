const marked = require('marked')
const hljs = require('highlight.js')

marked.setOptions({
  highlightClass: 'hljs',
  highlight: (code) => hljs.highlightAuto(code).value
})

exports.markedWithHighlight = marked
