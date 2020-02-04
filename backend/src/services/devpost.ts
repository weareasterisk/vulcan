import { Request, Response } from "express"
import multer from "multer"

const upload = multer({})

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export const convertDevpostToGavelCSV = async (req: Request, res: Response) => {
  res.json({
    req,
  })
}

export const convertDevpostUploadToGavelConsumableData = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req
  },
]
