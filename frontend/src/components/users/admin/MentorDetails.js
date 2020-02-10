import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";
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
import Axios from "axios";

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

export default function MentorDetails(props) {
  const classes = useStyles();
  const { email, id, headers } = props;
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [getclass, setGetClass] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Axios.get(`/api/class?id=${id}`, headers).then(res => {
      setGetClass(res.data);
    });
  });

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
              {getclass.map(elm => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={blackboard}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={elm.class_name}
                    secondary={secondary ? "Secondary text" : null}
                  />

                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <Tooltip title="Number of Students">
                        <Typography>10</Typography>
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
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
