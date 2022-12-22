import express from "express";
const router = express.Router();
import {loginController, registerController,logout} from '../controllers/auth.js';
import { checkDuplicate } from "../middleware/verifySignup.js";


router.post('/login', loginController)
router.post('/register',checkDuplicate, registerController)
router.post('/logout', logout)

export default router