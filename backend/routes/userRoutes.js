const router = require('express').Router()
const { registerUser, getAllUsers, loginUser, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", authMiddleware, getAllUsers)
router.get("/:id", authMiddleware, getUserById)
router.patch("/:id", authMiddleware, updateUser)
router.delete("/:id", authMiddleware, deleteUser)

module.exports = router