const express = require('express')
const handlers = require('./handlers')

const router = express.Router()

router.get('/', handlers.index)
router.get('/home/:id?', handlers.index)
// router.get('/test', handlers.insert)
router.get('/show', handlers.show)
// router.get('/input', handlers.input)
// router.post('/insert', handlers.insert)
router.post('/api', handlers.postApi)
router.post('/delete', handlers.delete)
router.get('/post/:id', handlers.post)
router.get('/category/:category', handlers.category)
router.get('/aboutme', handlers.aboutme)

module.exports = router
