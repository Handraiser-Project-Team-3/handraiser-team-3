import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
  add: {
    color: "white"
  },
  handContainer: {
    marginTop: "-35px ",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    marginBottom: "1vh"
  },
  fab: {
    backgroundColor: "#5365BC",
    border: "solid 0px #ececfa",
    "&:hover": {
      borderWidth: "5px",
      backgroundColor: "#5365BC"
    }
  }
}));

export default function Request(props) {
  /* eslint-disable */
  const classes = useStyles();
  const { setEdit, edit, open, setOpen, socket } = props;
  const title = !!edit && edit.title;

  const { register, errors, setError, handleSubmit, clearError } = useForm();

  // modal
  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmitEditedRequest = () => {
    socket.emit(`edit_request`, edit);
    handleClick();
    setEdit({});
    alertToast("Successfully Edited");
  };
  return (
    <div>
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
          onSubmit={handleSubmit(handleSubmitEditedRequest)}
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
              defaultValue={title}
              onChange={e => {
                if (e.target.value.length >= 30) {
                  return setError(
                    e.target.name,
                    "notMatch",
                    "Character limit reached!"
                  );
                }
                clearError(e.target.name);
                setEdit({ ...edit, title: e.target.value });
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
// toast
let toastId = null;
const alertToast = msg => {
  if (!toast.isActive(toastId)) {
    toastId = toast.info(msg, {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 3000,
      closeOnClick: true
    });
  }
};
