import express, { Router } from "express"
import * as devpostService from "../../services/devpost"

/**
 * Routes are prepended with /api/v1/gavel/
 */

const router: Router = express.Router()

router.post("/", devpostService.convertDevpostToGavelCSV)

export default router
