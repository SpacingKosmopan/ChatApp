import { useEffect, useState } from "react";
import { getUsers, getChat } from "./api/gets.ts";
import NewUser from "./components/NewUser.tsx";
import UserList from "./components/UserList.tsx";

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

function App() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [input, setInput] = useState<(string | number)[]>([0, ""]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    getUsers().then(setUsers);
    fetchMessages();
  }, []);

  function fetchMessages() {
    getChat(0, "desc").then(setChat);
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

  if (!chat) return null;
  return (
    <div>
      <NewUser />
      <UserList users={users} />

      <div>
        <input
          type="text"
          placeholder={`Chat as ${chat.messager1}...`}
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
          placeholder={`Chat as ${chat.messager2}...`}
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
          {chat.messages.map((message: Message, msgindex) => (
            <li key={msgindex}>
              {message.sender} sent on {new Date(message.date).toDateString()}:{" "}
              {message.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
