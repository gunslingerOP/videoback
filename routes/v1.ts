import * as express from "express";
import { DataController } from "../controllers/data.controllers";
import UserController from "../controllers/user.controller";
import userAuth from "../middleware/userAuth";
const router = express.Router()

router.post("/login", UserController.login)
router.get("/google/token", UserController.getLogintoken)

router.post("/video",userAuth, DataController.uploadVideo)
export default router