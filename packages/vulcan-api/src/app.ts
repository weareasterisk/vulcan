import express, { Express } from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import morgan from "morgan"
import compression from "compression"
import helmet from "helmet"
import createHttpError from "http-errors"
import winston, { LoggerStream } from "./utils/logger"
import router from "./routes"

const app: Express = express()

app.use(morgan("dev", { stream: new LoggerStream() }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(compression())
app.use(helmet())

app.use("/", router)

/*
 * Generate 404 if route not found
 * */
app.use((_req, _res, next) => {
  next(createHttpError(404))
})

/*
 * Error handling
 * */
app.use((err, res, _next) => {
  res.locals.message = err.statusMessage
  res.locals.error = process.env.NODE_ENV === "development" ? err : {}

  winston.error(
    `${err.statusCode || 500} - ${err.statusMessage} - ${err.originalUrl} - ${err.method} - ${
      err.ip
    }`
  )

  res.status(err.statusCode || 500).end()
})

export default app
