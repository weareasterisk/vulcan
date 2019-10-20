import express, { Router } from "express"

const router: Router = express.Router()

import apiRouter from "./api"

router.use("/api/v1", apiRouter)

export default router
