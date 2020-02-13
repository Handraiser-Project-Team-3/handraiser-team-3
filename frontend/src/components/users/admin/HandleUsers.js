import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function HandleUsers(props) {
  const { open, setOpen, details, headers, handle, setUsers } = props;

  const handleClose = () => {
    setOpen(false);
  };

  function handleMentor() {
    // SET MENTOR

    if (handle === "set") {
      axios
        .patch(
          `/api/user/${details.id}`,
          {
            account_type_id: 2
          },
          headers
        )
        .then(res => {
          toast.info("Mentor has been Added!");
          setOpen(false);
        })
        .then(() =>
          axios.get("/api/user/list", headers).then(res => {
            setUsers(res.data);
          })
        );
    } else {
      axios
        .patch(
          `/api/user/${details.id}`,
          {
            account_type_id: 3
          },
          headers
        )
        .then(res => {
          toast.info("Mentor has been Removed!");
          setOpen(false);
        })
        .then(() =>
          axios.get("/api/user/list", headers).then(res => {
            setUsers(res.data);
          })
        );
    }
  }

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
          {"Confirmation Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {handle === "set"
              ? `Do you want to set ${details.email} as a Mentor?`
              : `Do you want to remove ${details.email} as a Mentor?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleMentor} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
