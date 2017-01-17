const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const categoriesSchema = new Schema({
  type: {
    type: String,
    require: [true, 'category type is required!']
  },
  name: {
    type: String,
    require: [true, 'category name is required!']
  }
})

const postSchema = new Schema({
  _id: ObjectId,
  title: String,
  author: String,
  categories: [categoriesSchema],
  content: String
})

exports.Post = mongoose.model('Post'. postSchema)
