export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}

export async function getMessages() {
  const res = await fetch("/api/chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 0 }),
  });
  return res.json();
}
