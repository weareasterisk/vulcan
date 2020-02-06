import assert from "assert"
import { MongoClient, Db } from "mongodb"
import config, { Config } from "../config"

const constructUrl = (
  username: string,
  password: string,
  host: string,
  port: string | number,
  database: string
): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${database}`
}

export default class MongoDao {
  public static client: MongoClient
  public static db: Db

  public static connect(): Promise<any> {
    return new Promise<any>((res, rej) => {
      MongoClient.connect(
        constructUrl(
          config.mongodb.username,
          config.mongodb.password,
          config.mongodb.host,
          config.mongodb.port,
          config.mongodb.database
        ),
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client: MongoClient) => {
          if (err) {
            rej(err)
          } else {
            MongoDao.client = client
            MongoDao.db = client.db(config.mongodb.database)
            res(client)
          }
        }
      )
    })
  }

  public static getDb(): Db {
    return MongoDao.db
  }

  public static getClient(): MongoClient {
    return MongoDao.client
  }

  public static disconnect(): void {
    MongoDao.client.close()
  }
}
