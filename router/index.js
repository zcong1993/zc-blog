const express = require('express')
const handlers = require('./handlers')

const router = express.Router()

router.get('/home/:id?', handlers.index)
router.get('/test', handlers.insert)
router.get('/show', handlers.show)
router.get('/post/:id', handlers.post)

module.exports = router
