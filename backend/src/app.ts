import express, { Express, Request, Response } from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import morgan from "morgan"
import compression from "compression"
import helmet from "helmet"
import createHttpError, { HttpError } from "http-errors"
import winston, { LoggerStream } from "./utils/logger"
import { shouldCompress } from "./middleware/compression"
import router from "./routes"

const app: Express = express()

const morganJSONMatcher =
  '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}'

app.use(morgan(morganJSONMatcher, { stream: new LoggerStream() }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(compression({ filter: shouldCompress }))
app.use(helmet())

app.use("/", router)

/*
 * Generate 404 if route not found
 * */
app.use((_req: Request, _res: Response, next: Function) => {
  next(createHttpError(404))
})

/*
 * Error handling
 * */
app.use((err: HttpError, req: Request, res: Response, next: Function) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV === "development" ? err : {}

  // console.log(req)

  if (res.headersSent) {
    return next(err)
  }

  winston.error(`${err.status || 500} - ${err.message} - ${req.url} - ${req.method} - ${req.ip}`)

  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  })
})

/**
 * @exports Express
 */
export default app
