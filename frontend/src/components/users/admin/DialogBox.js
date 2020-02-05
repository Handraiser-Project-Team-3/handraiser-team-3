import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Confirmation(props) {
  return (
    <div>
      <Dialog
        key={props.id}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Message:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Set {row.email} a Mentor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {row.account_type_id === 3 && (
            <Button
              onClick={() => handleSetMentor(row.id)}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          )}
          {row.account_type_id === 2 && (
            <Button
              onClick={() => handleClickRemove(row.id)}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
