const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next()
  } else {
    // console.log(req.session)
    res.status(400).json({ isAuth: false })
  }
}

module.exports = { isAuth }
