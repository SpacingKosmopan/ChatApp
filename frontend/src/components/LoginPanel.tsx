import { useState, useEffect } from "react";
import { getUsers, getUser } from "../api/gets.ts";
import type { User } from "../lib/Interfaces";

export default function LoginPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("Wybierz osobę, aby się zalogować");

    async function initApp() {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }

    initApp();
  }, []);

  async function LoginAs(userId: number) {
    try {
      const user: User = await getUser(userId);
      if (!user) {
        console.warn("User not found");
        return;
      }
      console.log({ user });
      SetTimedMessage(JSON.stringify(user), 3000);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  function SetTimedMessage(msg: string, timeoutTime: number) {
    setMessage(msg);

    const timer = setTimeout(() => {
      setMessage("Wybierz osobę, aby się zalogować");
    }, timeoutTime);

    return () => clearTimeout(timer);
  }

  return (
    <>
      {users.length === 0 ? (
        "Ładowanie czatów..."
      ) : (
        <>
          <p>{message}</p>
          <br />
          Zaloguj jako:
          <ul className="users-list">
            {users.map((user: User, index: number) => (
              <li
                key={index}
                className="select-user"
                onClick={() => LoginAs(user.id)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
