import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
  }
  //   message: {
  //     color: "white",
  //     backgroundColor: "black",
  //     justifyContent: "flex-end"
  //   },
  //   reply: {
  //     float: "left"

  //     // backgroundColor: "black"
  //   },
  //   bottom: {
  //     paddingLeft: "5px",
  //     width: "95%",
  //     height: "5vh"
  //   }
}));

export default function ChatBox() {
  const classes = useStyles();

  // this.state = {
  //   messages: [
  //     {
  //       type: 0,
  //       image: "cat.jpg",
  //       text: "Hello! Good Morning!"
  //     },
  //     {
  //       type: 1,
  //       image: "dog.jpg",
  //       text: "Hello! Good Afternoon!"
  //     }
  //   ]
  // };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Paper className={classes.top}>
          <Grid xs={12} className={classes.topName}>
            <ForumIcon style={{ fill: "grey", fontSize: 35 }} />
            <Typography variant="h8">{"Mark Medes"}</Typography>
          </Grid>
        </Paper>
        {/* <Paper className={classes.MainChatBox}>
          <Grid container xs={4} className={classes.message}>
            <Paper>message</Paper>
          </Grid>
          <Paper className={classes.message}>dasd</Paper>
          <Grid container xs={4} className={classes.reply}>
            <Paper>reply</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.reply}>messs</Paper>
          </Grid>
        </Paper>
        <Paper className={classes.bottom}>asdasd</Paper> */}
        {/* <ChatBubble messages={this.state.messages} /> */}
      </Paper>
    </React.Fragment>
  );
}
