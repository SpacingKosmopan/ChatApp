import express from "express";
import usersRouter from "./routes/users";
import chatsRouter from "./routes/chats";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ready to use");
});
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);

app.listen(3000);
