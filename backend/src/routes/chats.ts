import { Router } from "express";
import { getMessages } from "../controllers/chatsController";

const router = Router();

router.get("/", getMessages);

export default router;
