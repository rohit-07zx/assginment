import express from "express";
import userControllers from "./../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/worko/user/loadUsers", userControllers.loadInitaliUserData);
router.post("/worko/user/login", userControllers.login);
router.get("/worko/user/", verifyJwt, userControllers.getAllUsers);
router.get("/worko/user/:id", verifyJwt, userControllers.getUserById);
router.post("/worko/user", userControllers.createUser);
router.put("/worko/user/:id", verifyJwt, userControllers.updateUser);
router.delete("/worko/user/:id", verifyJwt, userControllers.deleteUser);

export default router;
