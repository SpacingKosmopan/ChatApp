import express from "express";
import usersRouter from "./routes/users";
import chatsRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);

app.listen(3000);
