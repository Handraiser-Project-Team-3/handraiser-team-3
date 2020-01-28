import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { HashRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";

function App() {
  const [metaData, setMetaData] = useState({});
  const [user, setUser] = useLocalStorage("user", {});

  return (
    <HashRouter>
      <Routes
        metaData={metaData}
        setMetaData={metaData}
        user={user}
        setUser={setUser}
      />
    </HashRouter>
  );
}

export default App;
