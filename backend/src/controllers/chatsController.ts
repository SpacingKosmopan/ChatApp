import { Request, Response } from "express";

interface Chat {
  id: number;
  messager1: number;
  messager2: number;
  messages: Message[];
}

interface Message {
  sender: number;
  content: string;
  date: Date;
}

const chats: Chat[] = [
  {
    id: 0,
    messager1: 0,
    messager2: 1,
    messages: [
      { sender: 0, content: "Hello world!", date: new Date() },
      { sender: 1, content: "Hi!", date: new Date() },
    ],
  },
];

export const getMessages = (req: Request, res: Response) => {
  const chatId: number = Number(req.query.chatId);
  if (!Number.isFinite(chatId)) {
    return res.status(400).json({
      error: "Wrong id",
    });
  }
  const chatMessages = chats.filter((chat) => chat.id === chatId);
  res.json(chatMessages);
};
