import dotenv from "dotenv"
dotenv.config()

import * as http from "http"
import Debug from "debug"
import app from "../src/app"

const logger = Debug("app:src/app.ts")
const DEFAULT_PORT = 8080

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: number | string): number {
  const portNumber: number = typeof val === "string" ? parseInt(val, 10) : val

  if (isNaN(portNumber)) return DEFAULT_PORT

  return portNumber
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || DEFAULT_PORT)
app.set("port", port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case "EADDRINUSE":
      logger(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address()
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr && addr.port}`
  console.log(`App started and listening on ${bind}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

/**
 * Additional error and user action handling
 */

process.on("SIGTERM", () => {
  logger("Received SIGTERM, app closing...")
  process.exit(0)
})

process.on("SIGINT", () => {
  logger("Received SIGINT, app closing...")
  process.exit(0)
})

process.on("unhandledRejection", reason => {
  logger(`Unhandled promise rejection thrown: `)
  logger(reason)
  process.exit(1)
})
