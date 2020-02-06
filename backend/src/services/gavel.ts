import { Request, Response } from "express"
import multer from "multer"
import { BAD_REQUEST } from "http-status-codes"
import * as errors from "../utils/errors"
import upload from "../utils/upload"

import * as csv from "../utils/csv"
import createHttpError from "http-errors"

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
/**
 * @param  {} "file"
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @returns void
 */
export const convertDevpostUploadToGavelConsumableData = [
  upload.single("file"),
  (req: Request, res: Response, next: Function): void => {
    const { file } = req
    if (!file) {
      res.status(BAD_REQUEST)
      next("Required resource does not exist.")
    }
  },
]

export interface GavelExportData {
  title: string
  description: string | void
  location: string
}

export interface GavelConsumableDataInjestBody {
  schema: {
    title: string | number
    description: Array<string>
    location: string
    separator: string
  }
  data: Array<{
    [index: string]: string
  }>
}

/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @returns Promise
 */
export const conformToGavelConsumableData = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const { body } = req
    const { schema, data }: GavelConsumableDataInjestBody = body
    const { title, description, location, separator } = schema

    const constructedDataAccumulator: Array<GavelExportData> = []

    data.forEach(item => {
      let descriptionAccumulator = ""
      description.values
        ? description.forEach(element => {
            descriptionAccumulator +=
              (item[element]?.toString().trim() || "DESCRIPTION UNAVAILABLE") + separator
          })
        : (descriptionAccumulator = "ERROR")

      constructedDataAccumulator.push({
        title: title in item ? item[title].toString().trim() : "TITLE UNAVAILABLE",
        description: descriptionAccumulator
          .substr(0, descriptionAccumulator.length - separator.length)
          .trim(),
        location: location in item ? item[location].toString().trim() : "LOCATION UNAVAILABLE",
      })
    })

    res.status(200).send(await csv.toCsv(constructedDataAccumulator))
  } catch (e) {
    next(createHttpError(BAD_REQUEST, "Please ensure data follows schema correctly."))
  }
}
