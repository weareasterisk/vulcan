import express, { Router } from "express"
import gavelRouter from "./gavel"

/**
 * Routes are prepended with /api/v1/
 */

const router: Router = express.Router()

router.use("/gavel", gavelRouter)

export default router
