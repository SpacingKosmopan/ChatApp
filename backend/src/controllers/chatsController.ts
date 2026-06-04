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
  chatId: number;
}

const chats: Chat[] = [
  {
    id: 0,
    messager1: 0,
    messager2: 1,
    messages: [
      {
        sender: 0,
        content: "Hello world!",
        date: new Date("2026-06-04T12:56:07.072Z"),
        chatId: 0,
      },
      { sender: 1, content: "Hi!", date: new Date(), chatId: 0 },
    ],
  },
];

export const getMessages = (req: Request, res: Response) => {
  const chatId = Number(req.query.chatId);
  if (!Number.isFinite(chatId)) {
    return res.status(400).json({
      error: `Wrong id: ${chatId}`,
    });
  }

  const chat = chats.find((c) => c.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  //* no sort
  if (!req.query.sort) {
    return res.json({
      ...chat,
    });
  }
  //* sort check
  const sort = String(req.query.sort).trim();
  if (sort !== "" && sort !== "asc" && sort !== "desc") {
    return res.status(400).json({ error: "Incorrect sort type" });
  }

  //* inline method
  const sortedMessages = [...chat.messages].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    const diff = timeA - timeB;
    return sort === "asc" ? diff : -diff;
  });

  return res.json({
    ...chat,
    messages: sortedMessages,
  });
};

export const createMessage = (req: Request, res: Response) => {
  const { sender, content, chatId } = req.body;

  if (typeof chatId !== "number") {
    return res.status(400).json({
      message: `Incorrect chat identification number: ${chatId}`,
    });
  }

  if (typeof content !== "string") {
    return res.status(400).json({
      message: `Incorrect message content`,
    });
  }

  if (typeof sender !== "number") {
    return res.status(400).json({
      message: `Incorrect sender identification number`,
    });
  }

  const chat = chats.find((c) => c.id === chatId);

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const msg: Message = {
    sender,
    content,
    date: new Date(),
    chatId,
  };

  chat.messages.push(msg);

  return res.status(201).json({
    message: "Successfully added new message",
    data: msg,
  });
};
