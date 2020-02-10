import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import student from "../../assets/images/student.png";
import mentor from "../../assets/images/mentor2.png";
import Badge from "@material-ui/core/Badge";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

const useStyles = makeStyles(theme => ({
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
  root: {
    padding: "15px",
    backgroundColor: "#e2e3f7",
    marginTop: "1vh",
    borderRadius: "5px"
  },
  top: {
    background:
      "linear-gradient(207deg, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 22%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 26%, rgba(255,255,255,1) 72%, rgba(171,171,250,1) 72%, rgba(171,171,250,1) 73%)",
    padding: "0px",
    margin: "0px",
    width: "100%"
  },
  topName: {
    padding: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  convoBox: {
    backgroundColor: "whitesmoke",
    maxHeight: 500,
    height: "50vh",
    overflow: "auto",
    margin: "10px 0 10px 0 "
  },
  inputArea: {
    paddingTop: "5px",
    alignItems: "center",
    justifyContent: "center"
  },
  inputAreacontainer: {
    display: "flex",
    mentorAvatar: {
      position: "fixed"
    }
  },
  spanStyle: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "whitesmoke",
    wordBreak: " break-all",
    border: " 2px solid #ababfa",
    padding: "10px",
    borderRadius: "5px 20px"
  }
}));

export default function ChatBox() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Paper className={classes.top} elevation={3}>
        <Grid className={classes.topName}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src={student}
              style={{ background: "white", padding: "3px" }}
            />
          </StyledBadge>
          <Typography
            variant="h6"
            style={{ paddingLeft: "10px", color: "#525252" }}
          >
            Mark Medes
          </Typography>
        </Grid>
      </Paper>

      {/* messages] */}
      <Paper className={classes.convoBox} elevation={6}>
        <Grid container direction="column">
          {/* {messages.map(m => {
              return ( */}
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
                <span
                  className={classes.spanStyle}
                  style={{ marginRight: "10px" }}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum"
                  }
                </span>
              </Grid>

              <Grid item>
                <Avatar
                  className={classes.mentorAvatar}
                  alt="mentor"
                  src={mentor}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* );
            })} */}
          <Grid container alignItems="center" justify="flex-start">
            <Grid
              item
              style={{
                margin: 5
              }}
            >
              <Avatar alt="student" src={student} />
            </Grid>

            <Grid xl={5} lg={5} md={6} sm={7} xs={8} item>
              <span
                className={classes.spanStyle}
                style={{
                  border: "2px solid #ff6f61",
                  borderRadius: "20px 5px",
                  maxWidth: "300px"
                }}
              >
                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
              </span>
            </Grid>
          </Grid>
        </Grid>

        {/* endofmessages */}
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
                <Button endIcon={<SendIcon />}></Button>
              </InputAdornment>
            )
          }}
        />
      </Paper>
    </Paper>
  );
}
