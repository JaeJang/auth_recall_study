import express from "express";
import controller from "../controllers/user";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/validate", controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/getall", extractJWT, controller.getAllUsers);

export default router;
