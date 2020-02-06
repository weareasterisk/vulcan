import express, { Router } from "express"
import * as gavel from "../../services/gavel"

/**
 * Routes are prepended with /api/v1/gavel/
 */

const router: Router = express.Router()

router.post("/ingestion/raw", gavel.conformToGavelConsumableData)

export default router
