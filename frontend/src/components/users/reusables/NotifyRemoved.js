import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import WarningIcon from "@material-ui/icons/Warning";

export default function({ open, setOpen, action }) {
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
            {action === "removed_user" && (
              <span>
                Mentor removed you from this class{" "}
                <Link to="/">Learn more</Link>
              </span>
            )}
            {action === "class_closed" && (
              <span>
                This class has been closed. <Link to="/">Learn more</Link>
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              history.push("/");
              setOpen(false);
            }}
          >
            Home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
