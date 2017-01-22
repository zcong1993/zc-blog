const postSampleData = {
  title: 'Introducing Pure',
  author: 'Tilo Mitra',
  categories: [
    {
      type: 'css',
      name: 'CSS'
    },
    {
      type: 'php',
      name: 'PHP'
    },
    {
      type: 'js',
      name: 'Js'
    }
  ],
  content: 'Yesterday at CSSConf, we launched Pure – a new CSS library. Phew! Here are the <a href="https://speakerdeck.com/tilomitra/pure-bliss">slides from the presentation</a>. Although it looks pretty minimalist, we’ve been working on Pure for several months. After many iterations, we have released Pure as a set of small, responsive, CSS modules that you can use in every web project.'
}

exports.getPosts = function (num = 5) {
  return new Array(num).fill(postSampleData)
}
