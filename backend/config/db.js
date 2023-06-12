const { connect } = require('mongoose')

const connectDB = async () => {
  try {
    await connect('mongodb://192.168.1.24:27017/demo')
    console.log('---> db connected')
  } catch (err) {
    console.log(`mongo error: ${err.message}`)
  }
}

module.exports = connectDB