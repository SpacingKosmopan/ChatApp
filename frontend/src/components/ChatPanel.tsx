import { useEffect, useState } from "react";
import { getChat, getUser } from "../api/gets.ts";
import UserList from "../components/UserList.tsx";
import type { User, Chat, Message } from "../lib/Interfaces";

export default function ChatPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [input, setInput] = useState<(string | number)[]>([0, ""]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    async function initApp() {
      try {
        const currentChat = await fetchMessages();
        if (currentChat) {
          const user1 = await getUser(currentChat.messager1);
          const user2 = await getUser(currentChat.messager2);

          setUsers([user1, user2]);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }

    initApp();
  }, []);

  async function fetchMessages(): Promise<Chat | null> {
    try {
      const chatData = await getChat(0, "desc");
      setChat(chatData);
      return chatData;
    } catch (error) {
      console.error("Failed to fetch chat:", error);
      return null;
    }
  }

  async function sendMessage(
    chatId: number,
    senderId: number,
    text: string,
  ): Promise<boolean> {
    if (!text.trim()) return false;

    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId,
        sender: senderId,
        content: text,
      }),
    });

    if (res.ok) {
      setInput((prev) => ({ ...prev, [senderId]: "" }));
      fetchMessages();
    }
    return res.ok;
  }

  if (!chat) return <div>Ładowanie czatu...</div>;

  const user1Obj = users.find((u) => u.id === chat.messager1);
  const user2Obj = users.find((u) => u.id === chat.messager2);

  const user1Name = user1Obj ? user1Obj.name : `ID ${chat.messager1}`;
  const user2Name = user2Obj ? user2Obj.name : `ID ${chat.messager2}`;

  return (
    <div>
      <UserList users={users} />

      <div>
        <input
          type="text"
          placeholder={`Chat as ${user1Name}...`}
          value={input[chat.messager1] || ""}
          onChange={(e) => {
            setInput((prev) => ({
              ...prev,
              [chat.messager1]: e.target.value,
            }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const userMessage = (input[chat.messager1] ?? "").toString();
              sendMessage(chat.id, chat.messager1, userMessage).then(
                (success) => {
                  setStatusMessage(success ? "Sent" : "Error");
                },
              );
            }
          }}
        />
        <input
          type="text"
          placeholder={`Chat as ${user2Name}...`}
          value={input[chat.messager2] || ""}
          onChange={(e) => {
            setInput((prev) => ({
              ...prev,
              [chat.messager2]: e.target.value,
            }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const userMessage = (input[chat.messager2] ?? "").toString();
              sendMessage(chat.id, chat.messager2, userMessage).then(
                (success) => {
                  setStatusMessage(success ? "Sent" : "Error");
                },
              );
            }
          }}
        />
        <p>{statusMessage}</p>
        <p>
          Chat of: {chat.messager1} and {chat.messager2}:
        </p>
        <ul>
          {chat.messages.map((message: Message, msgindex) => {
            const senderObj = users.find((u) => u.id === message.sender);
            const senderName = senderObj
              ? senderObj.name
              : `Użytkownik ${message.sender}`;

            return (
              <li key={msgindex}>
                <strong>{senderName}</strong> sent on{" "}
                {new Date(message.date).toDateString()}: {message.content}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
