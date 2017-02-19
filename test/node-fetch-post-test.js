const fs = require('fs')
const fetch = require('node-fetch')

const post = {
  key: 'rainbow',
  title: 'node fetch test',
  content: '`test`'
}

fetch('http://localhost:3000/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(post)
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
