import { Router } from "express";
import { loginController, registerController, verifyTokenController } from "../controllers/auth.controllers.ts";
import { checkToken } from "../middleware/middleware.ts";


const router = Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verifyMe', checkToken, verifyTokenController)

export default router