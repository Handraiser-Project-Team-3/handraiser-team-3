import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "500"
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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = props => {
  const classes = useStyles();
  const {
    open,
    setOpen,
    headTitle,
    action,
    setClassRoom,
    classRoom,
    headers,
    userId,
    setClassList,
    classList
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClass = () => {
    if (action === "Add") {
      axios
        .post(
          "/api/class",
          {
            user_id: userId,
            class_code: Math.random()
              .toString(36)
              .substring(2, 10),
            class_status: true,
            ...classRoom
          },
          headers
        )
        .then(res => {
          alert("Class Added");
          setOpen(false);
          setClassList([...classList, res.data]);
          setClassRoom({
            class_name: "",
            class_description: ""
          });
        });
    } else {
      console.log("edit");
    }
  };

  function handleInput(e) {
    setClassRoom({
      ...classRoom,
      [`${e.target.name}`]: e.target.value
    });
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            background: "#4abdac",
            color: "white"
          }}
        >
          {headTitle} {" Class"}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              label="Class Name"
              variant="outlined"
              name="class_name"
              value={classRoom.class_name}
              style={{ width: "95%" }}
              onChange={handleInput}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              name="class_description"
              multiline
              rowsMax="4"
              value={classRoom.class_description}
              variant="outlined"
              style={{ width: "95%" }}
              onChange={handleInput}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClass} color="primary" autoFocus>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
