const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ err: "provide all details" })
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const user = new User({ name, email, password: hashPassword })
    await user.save()
    return res.status(200).json({ msg: "registered successfully" })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: "no user found with this email, signup first" })
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    const token = jwt.sign({ name: user.name, email, id: user._id, role: user.role }, "qwertyqwerty12345")
    if (checkPassword) {
      return res.status(200).json({ msg: "login successfull", token })
    } else {
      return res.status(401).json('Incorrect password, login failed')
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ _id: id })
    if (req.user.role === "admin" || req.user.id === id) {
      console.log(user)
      user.name = req.body.name
      user.email = req.body.email
      if (req.body.password) {
        let newHash = bcrypt.hashSync(req.body.password, 10)
        user.password = newHash
      }
      if (req.body.role) {
        if (req.user.role === "admin") {
          user.role = req.body.role
        } else {
          return res.status(401).json({ msg: "only admin can change the role" })
        }
      }
      await user.save()

      return res.status(200).json({ msg: "user updated sucessfully" })
    } else {
      return res.status(401).json({ msg: "only admin or the user logged in can only update the user" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    if (req.body.role === "admin" || req.user.id === id) {
      const user = await User.findByIdAndDelete(id)
      return res.status(201).json({ msg: "user deleted successfully" })
    } else {
      return res.status(401).json({ msg: "only admin or logged in user can delete thier profile" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    if (req.user.role === "admin") {
      return res.status(200).json({ users })
    } else {
      return res.status(401).json({ msg: "admin and moderator can only view all the users" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({ _id: id })
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

module.exports = { registerUser, getAllUsers, loginUser, getUserById, updateUser, deleteUser }