const mongoose = require('mongoose')
const moment = require('moment-timezone')
const config = require('../config')
const {markedWithHighlight} = require('../utils')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const categoriesSchema = new Schema({
  type: {
    type: String,
    required: [true, 'category type is required!'],
    enum: ['default', 'node', 'js', 'php', 'css']
  },
  name: {
    type: String,
    required: [true, 'category name is required!']
  }
})

const postSchema = new Schema({
  title: {
    type: String,
    // unique: true,
    required: [true, 'title is required!'],
    validate: {
      validator: (v) => v.length < 50,
      message: '{VALUE} is too long!'
    }
  },
  author: {
    type: String,
    required: [true, 'author is required!']
  },
  categories: [categoriesSchema],
  content: {
    type: String,
    required: [true, 'content is required!']
  },
  updated: {
    type: Date,
    default: moment().tz('Asia/Shanghai').valueOf()
  }
})

/**
 * support get posts by pagination number
 * @param  {Number} num number of the pagination
 * @return {Array}     mongoose doc array of posts
 */
postSchema.statics.getPostsByPage = function (num) {
  return Promise.resolve(this.find().limit(config.postsPerPage).sort({updated: -1}).skip(config.postsPerPage * (num - 1)))
}

/**
 * get post by _id
 * @param  {ObjectId} id mongodb ObjectId
 * @return {Array}    mongoose doc array of posts
 */
postSchema.statics.findById = function (id) {
  return Promise.resolve(this.find({_id: id}))
}

/**
 * get posts by category
 * @param  {String} cate category name
 * @return {Array}      mongoose doc Array of posts
 */
postSchema.statics.findByCategory = function (cate) {
  return Promise.resolve(this.find({categories: {$elemMatch: {name: new RegExp(cate, 'i')}}}).sort({updated: -1}))
}

/**
 * get all posts count
 * @return {Number} sum of posts
 */
postSchema.statics.getCount = function () {
  return Promise.resolve(this.count({}))
}
/**
 * making marked tarns and format date when get posts
 * @type {[type]}
 */
postSchema.post('init', function (doc) {
  doc.markedContent = markedWithHighlight(doc.content)
  const date = doc.updated
  doc.time = {
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
})

exports.Post = mongoose.model('Post', postSchema)
