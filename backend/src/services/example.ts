import { Request, Response } from "express"

/**
 * @param req
 * @param res
 */
export const getMethod = (req: Request, res: Response) => {
  res.json({
    field: "one",
    another: "field",
  })
}
