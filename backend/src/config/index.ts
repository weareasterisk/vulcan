import dotenv from "dotenv"
dotenv.config()

export interface Config {
  port: number | string
  env: string
  mongodb: {
    host: string
    username: string
    password: string
    database: string
    gridFsDatabase: string
    port: string | number
  }
  redis: {
    host: string
    password: string
    port: number
  }
}

const defaults = {
  port: 8080,
  env: "development",
  mongodb: {
    host: "localhost",
    username: "vulcan",
    password: "vulcan",
    database: "vulcan",
    gridFsDatabase: "gridfs",
    port: "27017",
  },
  redis: {
    host: "localhost",
    password: "vulcan",
    port: "6379",
  },
}

const config: Config = {
  port: process.env.PORT || defaults.port,
  env: process.env.NODE_ENV || defaults.env,
  mongodb: {
    host: process.env.MONGODB_HOST || defaults.mongodb.host,
    username: process.env.MONGODB_USERNAME || defaults.mongodb.username,
    password: process.env.MONGODB_PASSWORD || defaults.mongodb.password,
    database: process.env.MONGODB_DATABASE || defaults.mongodb.database,
    gridFsDatabase: process.env.MONGODB_GRIDFS_DATABASE || defaults.mongodb.gridFsDatabase,
    port: Number.parseInt(process.env.MONGODB_PORT || defaults.mongodb.port, 10),
  },
  redis: {
    host: process.env.REDIS_HOST || defaults.redis.host,
    password: process.env.REDIS_PASSWORD || defaults.redis.password,
    port: Number.parseInt(process.env.REDIS_PORT || defaults.redis.port, 10),
  },
}

export default config
