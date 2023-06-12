const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user"
  },
  logs: [{
    type: Schema.Types.ObjectId,
    ref: "Log",
  }],
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: "Blog",
  }]
})

module.exports = model('User', userSchema)