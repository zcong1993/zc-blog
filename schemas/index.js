const mongoose = require('mongoose')
const config = require('../config')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const categoriesSchema = new Schema({
  type: {
    type: String,
    require: [true, 'category type is required!'],
    enum: ['design', 'pure', 'yui', 'js']
  },
  name: {
    type: String,
    require: [true, 'category name is required!']
  }
})

const postSchema = new Schema({
  title: {
    type: String,
    // unique: true,
    require: [true, 'title is required!'],
    validate: {
      validator: (v) => v.length < 50,
      message: '{VALUE} is too long!'
    }
  },
  author: {
    type: String,
    require: [true, 'author is required!']
  },
  categories: [categoriesSchema],
  content: {
    type: String,
    require: [true, 'content is required!']
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

postSchema.statics.getPostsByPage = function (num) {
  return Promise.resolve(this.find().limit(config.postsPerPage).sort({updated: -1}).skip(config.postsPerPage * (num - 1)))
}

postSchema.statics.findById = function (id) {
  return Promise.resolve(this.find({_id: id}))
}

postSchema.statics.findByCategory = function (cate) {
  return Promise.resolve(this.find({categories: {$elemMatch: {name: new RegExp(cate, 'i')}}}))
}

postSchema.statics.getCount = function () {
  return Promise.resolve(this.count({}))
}

exports.Post = mongoose.model('Post', postSchema)
