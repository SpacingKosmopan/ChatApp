export interface User {
  id: number;
  name: string;
}

export interface Chat {
  id: number;
  messager1: number;
  messager2: number;
  messages: Message[];
}

export interface Message {
  sender: number;
  content: string;
  date: Date;
}
