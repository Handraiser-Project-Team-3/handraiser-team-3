import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import jwt_decode from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [user, setUser] = useState();
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  React.useEffect(() => {
    if (accessToken) {
      setUser(jwt_decode(accessToken));
    }
  }, [accessToken]);
  return (
    <BrowserRouter>
      <Routes
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        user={user}
        setUser={setUser}
        headers={headers}
      />
    </BrowserRouter>
  );
}

export default App;
