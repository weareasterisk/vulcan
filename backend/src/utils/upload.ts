import multer from "multer"
import GridFsStorage from "multer-gridfs-storage"
import path from "path"
import crypto from "crypto"
import { Request } from "express"
import mongo from "../utils/mongo"

// const storage = new GridFsStorage({
//   db: mongo.getDb(),
//   file: (req: Request, file ) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err)
//         }
//         resolve({
//           filename: req.body.fileName + path.extname(file.originalname),
//           bucketName: "uploads"
//         })
//       })
//     })
//   }
// })

const upload = multer({})

export default upload
