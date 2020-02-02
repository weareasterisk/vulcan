import { Request, Response } from "express"

export const convertDevpostToGavelCSV = async (req: Request, res: Response) => {
  res.json({
    req,
  })
}
