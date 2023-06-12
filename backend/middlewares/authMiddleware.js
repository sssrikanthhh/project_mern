const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (header) {
    const token = header.split(" ")[1]
    jwt.verify(token, "qwertyqwerty12345", (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      console.log(user)
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = authMiddleware