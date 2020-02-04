import redis from "redis"
import bluebird from "bluebird"
import config from "../config"

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  // eslint-disable-next-line @typescript-eslint/camelcase
  auth_pass: config.redis.password,
})

export default redisClient
