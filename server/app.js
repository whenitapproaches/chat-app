const express = require("express")
const configs = require("./configs")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const chalk = require("chalk")
const morgan = require('morgan')
const app = express()

require("./configs/database.config")
require('./configs/passport.config')

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Authorization, Content-Type, Set-Cookie",
    exposedHeaders: "*",
    credentials: true,
  })
)

app.use(express.json())

app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use(cookieParser())

app.use(morgan("dev"))

const { userRouter, messageRouter, profileRouter } = require("./routers")

app.use(userRouter)
app.use(messageRouter)
app.use(profileRouter)

app.listen(configs.PORT, () =>
  console.log(chalk.green("Server is listening..."))
)
