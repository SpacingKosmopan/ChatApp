import { useEffect, useState } from "react";
import { getUsers } from "./api/users";
import UserList from "./components/UserList.tsx";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default App;
