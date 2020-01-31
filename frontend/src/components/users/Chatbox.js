import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import ChatBubble from "react-chat-bubble";
const useStyles = makeStyles(theme => ({
  root: {
    margin: "28px",
    // display: "flex",
    // flexWrap: "wrap",
    height: "70vh",
    width: "45%",
    backgroundColor: "#4abdac",
    "@media (max-width: 320px)": {
      height: "50vh",
      width: "80%"
    }
  },
  top: {
    padding: "0px",
    margin: "0px",
    height: "5.5vh",
    width: "100%"
  },
  topName: {
    padding: "8px",
    display: "flex"
  },
  MainChatBox: {
    maxHeight: 500,
    overflow: "auto",
    width: "95%",
    margin: "20px",
    height: "60vh",

    "@media (max-width: 320px)": {
      marginTop: "-20px",
      width: "100%",
      margin: "50px"
    }
  },
  convoBox: {
    backgroundColor: "whitesmoke",
    maxHeight: 500,
    height: "50vh",
    overflow: "auto",
    margin: "30px"
  },
  messageArea: {
    outline: "none",
    resize: "none",
    borderRadius: "10px ",
    width: "400px"
  },
  sendButton:{
    marginRight: '90px'
  }
}));

export default function ChatBox() {
  const classes = useStyles();
  const [messages, setMessages] = useState([
    {
      message: "semo"
    },
    {
      reps: "eu"
    }
  ]);

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Paper className={classes.top}>
          <Grid xs={12} className={classes.topName}>
            <ForumIcon style={{ fill: "grey", fontSize: 35 }} />
            <Typography variant="h8">{"Mark Medes"}</Typography>
          </Grid>
        </Paper>

        {/* messages] */}
        <Paper className={classes.convoBox}>
          <Grid container direction="column">
            {messages.map(m => {
              console.log(m.reps, m.message);
            })}
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
                style={{ padding: 5 }}
              >
                <Grid
                  style={{
                    margin: 15,
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                  xl={5}
                  lg={5}
                  md={6}
                  sm={7}
                  xs={8}
                  item
                >
                  <span>sdasdad</span>
                </Grid>

                <Grid
                  style={{
                    height: "80px",
                    display: "flex",
                    alignItems: "flex-end"
                  }}
                  item
                >
                  <Avatar
                    alt="aas"
                    src="https://image.flaticon.com/icons/png/512/522/522301.png"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              justify="flex-start"
              style={{ padding: 5 }}
            >
              <Grid
                style={{
                  margin: 15,
                  display: "flex",
                  justifyContent: "flex-start"
                }}
                item
              >
                <Avatar
                  alt="mess"
                  src="https://image.flaticon.com/icons/png/512/522/522301.png"
                />
              </Grid>

              <Grid
                style={{ display: "flex", alignItems: "flex-end" }}
                xl={5}
                lg={5}
                md={6}
                sm={7}
                xs={8}
                item
              >
                <span>ssasas</span>
              </Grid>
            </Grid>
          </Grid>
          {/* endofmessages */}

          <Grid item style={{}} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid
                item
                style={{
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                lg={11}
                md={10}
                sm={9}
                xs={9}
              >
                <textarea
                  rows="2"
                  autoFocus
                  className={classes.messageArea}
                  placeholder="Type your message..."
                ></textarea>
              </Grid>
              <Grid
                item
                style={{
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 3
                }}
                lg={1}
                md={2}
                sm={3}
                xs={3}
              >
                <Button
                  style={{ height: "30px" }}
                  size="small"
                  variant="contained"
                  color="grey"
                  className={classes.sendButton}
                  endIcon={<SendIcon />}
                >
                  <label className={classes.buttonLabel}>SEND</label>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </React.Fragment>
  );
}