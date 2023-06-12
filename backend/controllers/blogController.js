const Blog = require('../models/Blog')

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
    if (req.user.role === "admin") {
      return res.status(200).json({ blogs })
    } else {
      return res.status(401).json({ msg: "admin and moderator can view all the blogs" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const getBlogById = async (req, res) => {
  const { id } = req.params
  try {
    const blog = await Blog.findOne({ _id: id })
    return res.status(200).json({ blog })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const getBlogsByUserId = async (req, res) => {
  const { userId } = req.params
  try {
    const blogs = await Blog.find({ userId })
    return res.status(200).json({ blogs })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const updateBlog = async (req, res) => {
  const { id } = req.params
  try {
    if (req.user.id === id) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body)
      return res.status(201).json({ msg: "blog updated successfully" })
    } else {
      return res.status(401).json({ msg: "only logged in user can update thier blogs only" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}


const deleteBlog = async (req, res) => {
  const { id } = req.params
  try {
    if (req.user.id === id) {
      const deletedBlog = await Blog.findByIdAndDelete(id)
      return res.status(201).json({ msg: "blog deleted successfully" })
    } else {
      return res.status(401).json({ msg: "only logged in user can delete thier blogs only" })
    }
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}



module.exports = { getAllBlogs, getBlogById, getBlogsByUserId, updateBlog, deleteBlog }