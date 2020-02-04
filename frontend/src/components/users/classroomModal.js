import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
export default function() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Add" placement="right-start">
        {/* <AddCircleIcon
            onClick={handleClickOpen}
            fontSize="large"
            style={{
              color: "#4abdac",
              cursor: "pointer"
            }}
          /> */}
        <Fab>
          <Avatar
            onClick={handleClickOpen}
            alt="Student"
            src="https://image.flaticon.com/icons/svg/148/148764.svg"
          />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nani?</DialogTitle>
        <DialogContent>
          <DialogContentText>asdasdasdasd</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="meow"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
