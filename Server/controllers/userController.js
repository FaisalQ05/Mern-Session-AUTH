const User = require("../models/userModel")

const login = async (req, res) => {
  const { email, password } = req.body
  if (!(email && password)) {
    res.status(400).json("please include email and password")
  }
  const findUser = await User.findOne({ email: email.toLowerCase() }).exec()
  if (findUser && (await findUser.isPasswordMatched(password))) {
    req.session.isAuth = true
    req.session.uId = findUser._id
    req.session.username = findUser.username
    res.json({ isLogin: true })
  } else {
    res.status(400).json({ isLogin: true, message: "Invalid credentials" })
  }
}
const register = async (req, res) => {
  const user = await User.create(req.body)
  if (user) {
    res.json("register successfully")
  } else {
    req.session.error = "Invalid Credentials"
    res.json("invalid data received")
  }
}

const getMe = async (req, res) => {
  //   console.log(req.session)
  const username = req.session.username
  res.json({ message: "authenticated", username })
}

const getUserDetails = async (req, res) => {
  console.log(req.session.uId)
  const user = await User.findById(req.session.uId)
    .select("-password")
    .lean()
    .exec()
  res.json({ user })
}

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err
    res.clearCookie("connect.sid")
    res.json({ isLogout: true })
  })
}

module.exports = { login, register, logout, getMe, getUserDetails }
