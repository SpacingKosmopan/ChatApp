import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// FAKE USERS DB
const users: { id: number; name: string }[] = [];

// GET USERS
app.get("/users", (req, res) => {
  res.json(users);
});

// ADD USER
app.post("/users", (req, res) => {
  const { name } = req.body;

  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Jan" }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
