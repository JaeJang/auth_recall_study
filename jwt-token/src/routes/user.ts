import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.get("/validate", controller.validateToken);
router.post("/validate", controller.register);
router.post("/validate", controller.login);
router.get("/validate", controller.getAllUsers);