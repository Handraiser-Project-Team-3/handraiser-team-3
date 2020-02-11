import React from "react";
import Paper from "@material-ui/core/Paper";
import bubbles from "../../assets/images/chat-box.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import student from "../../assets/images/student.png";
import mentor from "../../assets/images/mentor2.png";
import { useStyles } from "./chatboxStyle";

export default function ChatBox(props) {
  const classes = useStyles();
  const { messages } = props;

  return (
    <Paper className={classes.root}>
      <Paper className={classes.top} elevation={3}>
        <Grid className={classes.topName}>
          <img src={bubbles} style={{ width: "45px" }} />
          <Typography
            variant="h6"
            style={{ paddingLeft: "10px", color: "#525252" }}
          >
            Mark Medes
          </Typography>
        </Grid>
      </Paper>

      <Paper className={classes.convoBox} elevation={6}>
        <Grid container direction="column">
          {!messages
            ? "request help to start a conversation with your mentor"
            : "try"}
        </Grid>
      </Paper>
      <Paper className={classes.inputAreacontainer} elevation={6}>
        <TextField
          variant="outlined"
          id="standard-basic"
          label="Type your message..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  endIcon={
                    <SendIcon style={{ color: "#5ec8d5", cursor: "pointer" }} />
                  }
                ></Button>
              </InputAdornment>
            )
          }}
        />
      </Paper>
    </Paper>
  );
}
const MsgRight = props => {
  const classes = useStyles();
  const { message, sender } = props;
  return (
    <Grid
      style={{ display: "flex", alignItems: "center" }}
      xl={12}
      lg={12}
      item
    >
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        style={{ padding: 5, paddingRight: "10px" }}
      >
        <Grid
          item
          xl={5}
          lg={5}
          md={6}
          sm={7}
          xs={8}
          style={{
            maxWidth: "300px"
          }}
        >
          <span className={classes.spanStyle}>{message}</span>
        </Grid>

        <Grid item>
          <Avatar className={classes.mentorAvatar} alt="mentor" src={mentor} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const MsgLeft = props => {
  const classes = useStyles();
  const { message, sender } = props;
  return (
    <Grid container alignItems="center" justify="flex-start">
      <Grid
        item
        style={{
          margin: 5
        }}
      >
        <Avatar alt="student" src={sender.user_image} />
      </Grid>

      <Grid xl={5} lg={5} md={6} sm={7} xs={8} item>
        <span
          className={classes.spanStyle}
          style={{
            border: " 2px solid #ff6f61",
            borderRadius: "20px 5px",
            maxWidth: "300px"
          }}
        >
          {message}
        </span>
      </Grid>
    </Grid>
  );
};