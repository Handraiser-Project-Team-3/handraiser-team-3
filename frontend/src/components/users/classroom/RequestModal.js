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
    color: "#ff6f61",
    cursor: "pointer",
    "&:hover": {
      color: "brown"
    }
  }
}));
export default function(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { addNewRequest, newRequest, handleSubmitNewRquest } = props;

  const { register, errors, setError } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Add Request">
        <HelpOutlineIcon
          fontSize="large"
          className={classes.requestIcon}
          onClick={handleClickOpen}
        />
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
          onSubmit={e => {
            handleSubmitNewRquest(e);
            handleClose();
          }}
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
              error={!errors.username}
              variant="outlined"
              margin="normal"
              label="Request"
              name="request"
              fullWidth
              value={newRequest}
              onChange={e => {
                if (e.target.value.length === 30) {
                  return setError(
                    e.target.name,
                    "notMatch",
                    "Character limit reached!"
                  );
                }
                addNewRequest(e.target.value);
              }}
              inputRef={register({ required: true })}
              helperText={errors.username && errors.username.message}
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
