import express, { Router } from "express"
import * as exampleService from "../services/example"

const router: Router = express.Router()

/**
 * Routes here are prefixed with /api/v1 by default
 * Reference @file: /src/index.ts
 */

router.get("/", exampleService.getMethod)

export default router
