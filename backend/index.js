const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')

const app = express()
const PORT = 8080
app.use(cors())
dotenv.config()
app.use(express.json())

app.use('/users', userRouter)
app.use('/blogs', blogRouter)

connectDB()
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})

