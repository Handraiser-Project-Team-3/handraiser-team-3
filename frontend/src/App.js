import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
<<<<<<< HEAD
import { HashRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
=======
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
>>>>>>> 330ed027eebc84d0b11647e2f982eeef7a871084

function App() {
	const [metaData, setMetaData] = useState({});
	const [user, setUser] = useLocalStorage("user", {});

	return (
		<BrowserRouter>
			<Routes
				metaData={metaData}
				setMetaData={metaData}
				user={user}
				setUser={setUser}
			/>
		</BrowserRouter>
	);
}

export default App;
