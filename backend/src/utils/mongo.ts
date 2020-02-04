import { MongoClient, Db } from "mongodb"
import { Config } from "src/config"

const constructUrl = (
  username: string,
  password: string,
  host: string,
  port: string | number,
  database: string
): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${database}`
}

let client: MongoClient
let db: Db

export const connect = async (config: Config): Promise<void> => {
  client = await MongoClient.connect(
    constructUrl(
      config.mongodb.username,
      config.mongofb.password,
      config.mongodb.host,
      config.mongodb.port,
      config.mongodb.database
    )
  )
  db = client.db(config.mongodb.database)
}

export const close = async (): Promise<void> => {
  await client.close()
}

export const mongodb = (): Db => {
  return db
}
