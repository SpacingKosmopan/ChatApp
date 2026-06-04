import { useEffect, useState } from "react";
import { getUsers, getMessages } from "./api/gets.ts";
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
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
    getMessages(0, "desc").then(setChat);
  }, []);

  async function sendMessage(
    chatId: number,
    senderId: number,
  ): Promise<boolean> {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId,
        sender: senderId,
        content: inputMsg,
      }),
    });

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
          onChange={(e) => {
            setInputMsg(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (async () => {
                const result = await sendMessage(chat.id, chat.messager1);
                setInputMsg(result ? "Sent" : "Error");
              })();
            }
          }}
        />
        <input
          type="text"
          placeholder={`Chat as ${chat.messager2}...`}
          onChange={(e) => {
            setInputMsg(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (async () => {
                const result = await sendMessage(chat.id, chat.messager2);
                setInputMsg(result ? "Sent" : "Error");
              })();
            }
          }}
        />
        <p>{inputMsg}</p>
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
