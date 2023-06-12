const { Schema, model } = require('mongoose')

const logSchema = new Schema({
  userId: {
    typeof: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  prevState: {
    type: String
  },
  currentUpdate: {
    type: String,
    required: true,
  }
})

module.exports = model('Log', logSchema)