const express = require("express")
const configs = require("./configs")
configs.APP_PATH = __dirname
const cors = require("cors")
const cookieParser = require("cookie-parser")
const chalk = require("chalk")
const morgan = require("morgan")
const app = express()

require("./configs/database.config")
require("./configs/passport.config")

app.use(
  cors({
    origin: `http://${configs.HOST}:8080`,
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

const {
  userRouter,
  messageRouter,
  profileRouter,
  imageRouter,
} = require("./routers")

app.use(userRouter)
app.use(messageRouter)
app.use(profileRouter)
app.use(imageRouter)

const server = app.listen(configs.PORT, configs.HOST, () =>
  console.log(chalk.green("Server is listening..."))
)

const initSocket = require("./services/sockets")

initSocket(server)
