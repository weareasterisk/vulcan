import appRoot from "app-root-path"
import winston from "winston"

const options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5 MB
    maxFile: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  ...options,
  transports: [
    /*
     * Write logs with level `info` and above to `combined.log`
     *
     * Write logs with level `error` and below to `error.log`
     * */
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
  exitOnError: false,
})

/**
 * Console stream for Morgan
 */
export class LoggerStream {
  write(message: string) {
    logger.info(message.substring(0, message.lastIndexOf("\n")))
  }
}

export default logger
