import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "28px",
    height: "70vh",

    backgroundColor: "#4abdac",
    "@media (max-width: 320px)": {
      height: "50vh",
      width: "80%"
    },
    "@media (max-width: 1024px)": {
      marginLeft: "200px"
    },
    "@media(max-width:768px)": {
      marginLeft: "60px"
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
    width: "800px"
  },
  inputArea: {
    paddingTop: "5px",
    alignItems: "center",
    justifyContent: "center"
  },
  inputAreacontainer: {
    display: "flex",
    height: "8vh",
    width: "820px",
    margin: "20px",
    marginTop: "-15px",

    "@media (max-width: 1440px)": {
      width: "600px"
    }
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
                  // style={{
                  //   margin: 15,
                  //   display: "flex",
                  //   justifyContent: "flex-end",
                  //   backgroundColor: "green",
                  //   height: "10vh",
                  //   wordBreak: " break-all"
                  // }}
                  xl={5}
                  lg={5}
                  md={6}
                  sm={7}
                  xs={8}
                  item
                >
                  <span
                    style={{
                      margin: 15,
                      display: "flex",
                      justifyContent: "flex-end",
                      backgroundColor: "whitesmoke",

                      wordBreak: " break-all",
                      border: " 2px solid #4ABDAC",
                      padding: "10px",
                      borderRadius: "5px 20px"
                    }}
                  >
                    ssssssssssssssssssssssssssssssssssssssssssssssddasddddddddddddddddddddddddasdadad
                  </span>
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
                <span
                  style={{
                    margin: 15,
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "whitesmoke",

                    wordBreak: " break-all",
                    border: " 2px solid red",
                    padding: "10px",
                    borderRadius: "5px 20px"
                  }}
                >
                  {" "}
                  ssasas
                </span>
              </Grid>
            </Grid>
          </Grid>
          {/* endofmessages */}
        </Paper>
        <Paper className={classes.inputAreacontainer}>
          <Grid container className={classes.inputArea}>
            <Grid
              item
              style={{
                display: "flex"
              }}
              lg={11}
              md={10}
              sm={9}
              xs={9}
            >
              <TextField
                variant="outlined"
                id="standard-basic"
                label="Type your message..."
                className={classes.messageArea}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button endIcon={<SendIcon />}></Button>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </React.Fragment>
  );
}
