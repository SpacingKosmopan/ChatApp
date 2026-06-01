export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}

export async function getMessages(chatId: number) {
  const res = await fetch(`/api/chats?chatId=${chatId}`);
  return res.json();
}
