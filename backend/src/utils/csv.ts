import { Parser as JSONToCSV } from "json2csv"

export const toCsv = async (data: Record<string, any>): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(new JSONToCSV().parse(data))
    } catch (e) {
      reject(e)
    }
  })
}
