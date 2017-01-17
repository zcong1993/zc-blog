const mongoose = require('mongoose')

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
    unique: true,
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
  }
})

exports.postSchema = postSchema
