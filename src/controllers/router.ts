import { Router } from "express";
import loginRouter from "./authController";
import fileRouter from "./fileController";
import materialRouter from "./materialController";
const router = Router()

router.use("/auth", loginRouter)
router.use("/files", fileRouter)
router.use("/material", materialRouter)

export default router