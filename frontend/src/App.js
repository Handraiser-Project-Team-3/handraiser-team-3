import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
const socket = io(`172.60.60.163:3001`);

function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [user, setUser] = useState();
  React.useEffect(() => {
    if (accessToken) {
      const obj = { ...jwt_decode(accessToken), status: true };
      socket.emit("online", obj);
      setUser(obj);
    }
    return () => socket.emit(`disconnect`);
  }, [accessToken]);
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        user={user}
        setUser={setUser}
        headers={headers}
        socket={socket}
      />
    </BrowserRouter>
  );
}

export default App;
