export const AppState = {
  Login: "Login",
  Chatting: "Chatting",
} as const;

export type AppState = (typeof AppState)[keyof typeof AppState];
