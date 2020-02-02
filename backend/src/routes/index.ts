import express, { Router } from "express"
import apiRouter from "./api"

const router: Router = express.Router()

router.use("/api/v1", apiRouter)

export default router
