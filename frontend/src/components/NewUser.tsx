import { useState } from "react";

export default function NewUser() {
  const [username, setUsername] = useState("");

  async function addUser() {
    if (!username.trim()) return;

    try {
      const res = await fetch("/api/users", {
        // POST - create user
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username.trim() }),
      });

      if (res.ok) setUsername("");
    } catch (error) {
      console.error("Błąd wysyłania:", error);
    }
  }

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={addUser}>Dodaj</button>
    </>
  );
}
