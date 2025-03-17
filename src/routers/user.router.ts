import express from "express";
import { handleRegister, handleLogin, handleLogout } from "../controllers/user.controller";

const router = express.Router({ mergeParams: true });

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export { router as authRouter };
