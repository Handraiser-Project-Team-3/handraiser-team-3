import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import WarningIcon from "@material-ui/icons/Warning";

export default function NotifyLogout({
  open,
  setOpen,
  setAccessToken,
  setUser,
  socket
}) {
  const history = useHistory();

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Notification Message"} <WarningIcon style={{ color: "red" }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account priveleges has been change by admin.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <GoogleLogout
            clientId="98171074423-7khn6bi88f89ncbg6ev5ps5f962kdmlo.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() => {
              setAccessToken("");
              setUser({});
              history.push("/");
              alertToast("Successfully logged out!");
              setOpen(false);
              socket.off();
            }}
            render={renderProps => (
              <Button color="primary" onClick={renderProps.onClick} autoFocus>
                Logout
              </Button>
            )}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

const alertToast = msg =>
  toast.info(msg, {
    position: "top-right",
    hideProgressBar: true,
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
