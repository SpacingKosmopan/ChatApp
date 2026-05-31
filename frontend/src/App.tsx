import { useEffect, useState } from "react";
import { getUsers } from "./api/users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      Users ({users.length}): {JSON.stringify(users)}
    </div>
  );
}

export default App;
