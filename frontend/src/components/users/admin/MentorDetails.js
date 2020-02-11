import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import blackboard from "../../assets/images/blackboard.png";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
const useStyles = makeStyles({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "whitesmoke"
    }
  },
  details: {
    cursor: "pointer",
    color: "#aaaafa"
  },
  root: {
    flexGrow: 1,
    width: 400
  }
});

export default function MentorDetails(props) {
  const classes = useStyles();
  const { email, mentorId, headers } = props;
  const dense = false;
  const [classUsers, setClassUsers] = useState([]);
  const [classList, setClassList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    axios
      .get(`/api/class?id=${mentorId}`, headers)
      .then(res => setClassList(res.data))
      .catch(err => console.error(err));

    axios
      .get(`/api/classroom-users/`, headers)
      .then(res => {
        setClassUsers(res.data);
      })
      .catch(err => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Chip
        variant="outlined"
        size="medium"
        label={email}
        onClick={handleClickOpen}
        style={{ color: "#616161" }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ background: "#aaaafa", color: "white" }}
        >
          Mentor Details
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
              Classes
            </Typography>
            <List dense={dense}>
              {classList.map(row => (
                <div key={row.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={blackboard}></Avatar>
                    </ListItemAvatar>

                    <ListItemText>{row.class_name}</ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <Tooltip title="Number of Students">
                          <Typography key={row.id}>
                            {classUsers &&
                              classUsers.filter(res => {
                                return res.class_id === row.id;
                              }).length}
                          </Typography>
                        </Tooltip>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
