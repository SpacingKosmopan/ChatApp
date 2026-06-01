import { useEffect, useState } from "react";
import { getUsers, getMessages } from "./api/gets.ts";
import NewUser from "./components/NewUser.tsx";
import UserList from "./components/UserList.tsx";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
    getMessages().then(setMessages);
    console.log(messages);
  }, []);

  return (
    <div>
      <NewUser />
      <UserList users={users} />
    </div>
  );
}

export default App;
