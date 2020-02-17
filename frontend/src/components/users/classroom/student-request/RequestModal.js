import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useForm } from "react-hook-form";
import hand from "../../../assets/images/hand-animate.gif";

import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
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
    backgroundColor: "#AAAAF9",
    color: "white"
  },
  requestIcon: {
    color: "#474cb9",
    cursor: "pointer",
    "&:hover": {
      color: "brown"
    }
  },
  hand: {
    width: "80px",
    position: "absolute",
    bottom: theme.spacing(-70),
    right: theme.spacing(1),
    cursor: "pointer",
    zIndex: "3000"
  }
}));
export default function({
  addNewRequest,
  newRequest,
  handleSubmitNewRquest,
  open,
  setOpen
}) {
  const classes = useStyles();

  const { register, errors, setError, handleSubmit, clearError } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Click to raise your problem">
        <img src={hand} className={classes.hand} onClick={handleClickOpen} />
      </Tooltip>
      <Dialog
        className={classes.dialogMainContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleSubmitNewRquest)}
        >
          <DialogTitle
            id="form-dialog-title"
            className={classes.titleOfrequest}
          >
            Title of Request{" "}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              error={!!errors.request}
              variant="outlined"
              margin="normal"
              label="Request"
              name="request"
              fullWidth
              value={newRequest}
              onChange={e => {
                if (e.target.value.length >= 30) {
                  return setError(
                    e.target.name,
                    "notMatch",
                    "Character limit reached!"
                  );
                }
                clearError(e.target.name);
                addNewRequest(e.target.value);
              }}
              inputRef={register({ required: "Title is required" })}
              helperText={errors.request && errors.request.message}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
