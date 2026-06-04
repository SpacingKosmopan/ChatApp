import { Router } from "express";
import { getUsers, createUser, getUser } from "../controllers/usersController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);

export default router;
