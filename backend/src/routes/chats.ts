import { Router } from "express";
import { getMessages, createMessage } from "../controllers/chatsController";

const router = Router();

router.get("/", getMessages);
router.post("/", createMessage);

export default router;
