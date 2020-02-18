import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import hand from "../../../assets/images/hello.png";
import { useForm } from "react-hook-form";

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
    width: "43px",
    padding: "5px"
  },
  handContainer: {
    marginTop: "-60px ",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "15px"
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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Tooltip title="Click to raise your problem">
        <div className={classes.handContainer} onClick={handleClick}>
          <Fab
            size="medium"
            style={{ backgroundColor: "#5365BC" }}
            aria-label="add"
          >
            <img src={hand} className={classes.hand} />
          </Fab>
        </div>
      </Tooltip>
      <Dialog
        className={classes.dialogMainContainer}
        open={open}
        onClose={handleClick}
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
            <Button onClick={handleClick} color="primary">
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
