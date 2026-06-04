import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 0, name: "Janusz" },
  { id: 1, name: "Grażyna" },
  { id: 2, name: "Bożydar" },
];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Incorrect user id" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const name: string = req.body.name;
  if (!name) {
    console.warn("No user name");
    return res.status(400).json({ message: "No user name" });
  }

  const user: User = {
    id: Date.now(),
    name: req.body.name,
  };

  users.push(user);

  console.log("Created user:", user);

  res.status(201).json(user);
};
