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
            The class you're accessing now has been deleted, please go back to
            homepage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              history.push("/");
            }}
          >
            Go Back
          </Button>
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
