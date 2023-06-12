const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = model('Blog', blogSchema)