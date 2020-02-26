import "./App.css";
import React, { useState } from "react";
import { Routes } from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import NotifyLogout from "./components/users/reusables/NotifyLogout";

import Axios from "axios";
import { class_details } from "./components/users/reusables/UserDetails";
const socket = io(`${process.env.REACT_APP_BASE_URL}`);

function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [user, setUser] = useState();
  const [notifyLogout, setNotifyLogout] = useState(false);

  React.useEffect(() => {
    if (accessToken) {
      const obj = { ...jwt_decode(accessToken), status: true };
      socket.emit("online", obj);
      Axios.get(`${process.env.REACT_APP_PROXY_URL}/api/user/${obj.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => {
        res.data.account_type_id !== obj.account_type_id &&
          setNotifyLogout(true);
      });
      setUser(obj);
    }
    return () => socket.emit(`disconnect`);
  }, [accessToken]);

  React.useEffect(() => {
    if (!!user) {
      socket.on(`notify_user`, ({ id }) => {
        user.id === id && setNotifyLogout(true);
      });
    }
  }, [user]);

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  React.useEffect(() => {
    if (!!accessToken && !!user) {
      socket.on(`notify_assigned`, data => {
        data.user_id === user.id &&
          class_details(data.class_id, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then(res => {
            alertToast(
              `You've been added as mentor in class [ ${res.data.class_name} ]`
            );
          });
      });
    }
  }, [accessToken, user]);
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
      <NotifyLogout
        open={notifyLogout}
        setOpen={setNotifyLogout}
        setUser={setUser}
        setAccessToken={setAccessToken}
        socket={socket}
      />
    </BrowserRouter>
  );
}

export default App;
// toast
let toastId = null;
const alertToast = msg => {
  if (!toast.isActive(toastId)) {
    toastId = toast.info(msg, {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 5000,
      closeOnClick: true
    });
  }
};
