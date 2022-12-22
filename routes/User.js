import express  from "express";
import { getUser, resetPass, updateUser, userAvatar } from "../controllers/user.js";
import { verifyUser } from "../middleware/verify.js";
const router = express.Router();

router.get("/:id",getUser)
router.patch("/:id",verifyUser,updateUser)
router.get("/avatar/:id",userAvatar)
router.patch("/resetpass/:id", verifyUser, resetPass)





export default router