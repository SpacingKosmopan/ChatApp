import { AppState } from "./lib/AppState.tsx";
import { useState } from "react";
import ChatPanel from "./components/ChatPanel";
import LoginPanel from "./components/LoginPanel";
import "./App.css";

function App() {
  const [state, setState] = useState<AppState>(AppState.Login);

  const renderContent = () => {
    switch (state) {
      case AppState.Login:
        return <LoginPanel />;
      case AppState.Chatting:
        return <ChatPanel />;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
}

export default App;
