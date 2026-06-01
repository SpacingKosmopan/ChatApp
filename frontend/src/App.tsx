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
  const [messages, setMessages] = useState<Chat[]>([]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
    getMessages(0).then(setMessages);
  }, []);

  useEffect(() => {
    console.log("messages:", messages);
  }, [messages]);

  return (
    <div>
      <NewUser />
      <UserList users={users} />
      {messages.map((chat: Chat, index) => (
        <div key={chat.id}>
          <p>
            Chat of: {chat.messager1} and {chat.messager2}:
          </p>
          <ul>
            {chat.messages.map((message: Message, msgindex) => (
              <li key={msgindex}>
                {message.sender} sent on {new Date(message.date).toDateString()}
                : {message.content}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder={`Chat as ${chat.messager1}...`}
            onChange={(e) => {
              setInputMsg(e.target.value.trim());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputMsg(inputMsg + " => enter");
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
                setInputMsg((prev) => prev + " => enter");
              }
            }}
          />
          <p>{inputMsg}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
