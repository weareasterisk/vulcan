import express, { Router } from "express"
// import multer from "multer"
import * as exampleService from "../services/example"
import * as devpostService from "../services/devpost"

const router: Router = express.Router()

/**
 * Routes here are prefixed with /api/v1 by default
 * Reference @file: /src/index.ts
 */

// const upload = multer({})

router.get("/", exampleService.getMethod)

router.post("/gavel", devpostService.convertDevpostToGavelCSV)

export default router
