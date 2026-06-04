export async function getUsers() {
  const res = await fetch("/api/users");
  return res.json();
}

export async function getChat(chatId: number, sort: string = "") {
  const res = await fetch(`/api/chats?chatId=${chatId}&sort=${sort}`);
  return res.json();
}
