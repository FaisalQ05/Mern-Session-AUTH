require("dotenv").config()
require("express-async-errors")
const session = require("express-session")
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConnect")
const { default: mongoose } = require("mongoose")
const app = express()
const MongoDbSession = require("connect-mongodb-session")(session)

const { errorHandler } = require("./middleware/errorHandler")
const { logEvents, logger } = require("./middleware/logger")
const authRoute = require("./routes/userRoute")
const corsOptions = require("./config/corsOptions")

const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(express.json())
app.use(logger)
app.use(cors(corsOptions))

const store = new MongoDbSession({
  uri: process.env.DATABASE_URL,
  collection: "mySessions",
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // secure: true,
      // httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
)

app.use("/api/auth", authRoute)

app.all("*", (req, res) => {
  res.status(404)
  res.json("404 not found")
})

app.use(errorHandler)

mongoose.connection.once("open", () => {
  console.log("Database connected successFully")
  app.listen(PORT, () => console.log(`Server is runing on ${PORT}`))
})

mongoose.connection.on("error", (error) => {
  console.log("Mongoose Error : ", error)
})
