import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Avatar from "@material-ui/core/Avatar";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "1000"
    }
  },
  icons: {
    width: "20px",
    cursor: "pointer",
    "&:hover": {
      width: "23px",
      borderRadius: "10%"
    }
  },
  formControl: {
    margin: theme.spacing(3)
  },
  titleOfrequest: {
    backgroundColor: "#AAAAF9"
  },
    // dialogMainContainer:{
    //   width:'100%'
    // }
}));
export default function() {
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
      <Tooltip title="Add" placement="right-start">
        <Fab onClick={handleClickOpen} style={{ backgroundColor: "#AAAAF9" }}>
          {/* <Avatar
            alt="Modal"
            src="https://image.flaticon.com/icons/svg/148/148764.svg"
          /> */}
          <AddCircleOutlineIcon style={{ color: "whitesmoke" }} />
        </Fab>
      </Tooltip>

      <Dialog
      className={classes.dialogMainContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.titleOfrequest} style={{color:'whitesmoke'}}>
          Title of Request{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Ace</DialogContentText> */}
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Request"
              type="email"
              fullWidth
            />
          </form>
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
