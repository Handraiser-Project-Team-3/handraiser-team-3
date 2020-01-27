import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { HashRouter } from "react-router-dom";

function App() {
  const [metaData, setMetaData] = useState({});
  const [user, setUser] = useState({});

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
