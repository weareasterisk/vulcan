import appRoot from "app-root-path"
import winston from "winston"

const logger = winston.createLogger({
  level: "verbose",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
    winston.format.splat()
  ),
  transports: [
    /*
     * Write logs with level `info` and above to `combined.log`
     *
     * Write logs with level `error` and below to `error.log`
     * */
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console({
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
    }),
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
