import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "95%"
    }
  }
}));

export const JoinClassModal = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        style={{ color: "#4abdab" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        Join Class
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ background: "#4abdac", color: "white" }}
        >
          {"Join Class"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ marginTop: "2vh" }}
          >
            Ask your teacher for the class code, then enter it here
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Class Code"
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Join Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
