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

export const createUser = (req: Request, res: Response) => {
  const name: string = req.body.name;
  if (name === null || name === "") {
    console.warn("No user name");
    return;
  }

  const user: User = {
    id: Date.now(),
    name: req.body.name,
  };

  users.push(user);

  console.log("Created user:", user);

  res.status(201).json(user);
};
