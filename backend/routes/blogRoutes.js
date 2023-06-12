const router = require('express').Router()
const { getAllBlogs, getBlogById, getBlogsByUserId, updateBlog, deleteBlog } = require('../controllers/blogController')
const authMiddleware = require("../middlewares/authMiddleware")


router.get("/", authMiddleware, getAllBlogs)
router.get("/:id", authMiddleware, getBlogById)
router.get("/:userId", authMiddleware, getBlogsByUserId)
router.patch("/:id", authMiddleware, updateBlog)
router.delete("/:id", authMiddleware, deleteBlog)

module.exports = router