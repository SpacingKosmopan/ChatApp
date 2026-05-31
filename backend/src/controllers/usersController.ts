import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
}

const users: User[] = [{ id: 0, name: "Janusz" }];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const user: User = {
    id: Date.now(),
    name: req.body.name,
  };

  users.push(user);

  res.status(201).json(user);
};
