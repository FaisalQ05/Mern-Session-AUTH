const express = require("express")
const {
  login,
  logout,
  register,
  getMe,
  getUserDetails,
} = require("../controllers/userController")
const { isAuth } = require("../middleware/isAuth")
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/", isAuth, getMe)
router.get("/user", isAuth, getUserDetails)

module.exports = router
