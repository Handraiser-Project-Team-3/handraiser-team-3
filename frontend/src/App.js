import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import jwt_decode from "jwt-decode";


import Classrom from '../src/components/users/MentorsView'


function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [user, setUser] = useState();
  React.useEffect(() => {
    if (accessToken) {
      setUser(jwt_decode(accessToken));
    }
  }, [accessToken]);
  return (
    <BrowserRouter>
      {console.log(user)}
      <Routes
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        user={user}
        setUser={setUser}
      />
    </BrowserRouter>
   
  );
}

export default App;
