import appRoot from "app-root-path"
import winston from "winston"
import stripAnsi from "strip-ansi"

const stripAnsiFormatter = winston.format((info, _opts) => {
  info.message = stripAnsi(info.message)
  return info
})

const options = {
  console: {
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.splat(),
      winston.format.align(),
      winston.format.simple()
    ),
  },
  file: {
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.splat(),
      stripAnsiFormatter(),
      winston.format.json()
    ),
  },
}

const logger = winston.createLogger({
  defaultMeta: { service: "vulcan-service" },
  transports: [
    /*
     * Write logs with level `info` and above to `combined.log`
     *
     * Write logs with level `error` and below to `error.log`
     * */
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: "error",
      ...options.file,
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/combined.log`,
      level: "verbose",
      ...options.file,
    }),
    new winston.transports.Console(options.console),
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

/**
 * @exports logger
 */
export default logger
