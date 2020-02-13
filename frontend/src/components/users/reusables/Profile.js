import React, { useState, useEffect } from "react";
import axios from "axios";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

// images
import { UserDetails, class_details } from "./UserDetails";

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
  details: {
    cursor: "pointer",
    color: "#aaaafa"
  },
  root: {
    flexGrow: 1,
    width: 400
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: theme.spacing(3),
    border: "5px solid #aaaafa"
  },
  root1: {
    flexGrow: 1,
    maxWidth: 752
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const {
    email,
    account_type_id,
    first_name,
    last_name,
    userId,
    headers
  } = props;
  const [expanded, setExpanded] = useState(false);
  const [classUsers, setClassUsers] = useState([]);
  const [classList, setClassList] = useState([]);
  const [studentClass, setStudentClass] = useState([]);
  const [profile, setProfile] = useState(true);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get(`/api/class?id=${userId}`, headers)
      .then(res => setClassList(res.data))
      .catch(err => console.error(err));

    axios
      .get(`/api/classroom-users/`, headers)
      .then(res => {
        setClassUsers(res.data);
        Promise.all(
          res.data
            .filter(res => {
              return res.user_id === userId;
            })
            .map(res =>
              class_details(res.class_id, headers).then(res => {
                return res.data;
              })
            )
        ).then(response => {
          setStudentClass(response);
        });
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line
  }, []);

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
          {account_type_id === 2 ? "Mentor" : "Student"} Profile
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              align="center"
              spacing={2}
            >
              <Grid item>
                <UserDetails
                  id={userId}
                  headers={headers}
                  action="img"
                  profile={profile}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {first_name} {last_name}
                </Typography>
                <Typography variant="subtitle1" style={{ fontSize: "14px" }}>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={email}
                    style={{ color: "#616161" }}
                  />
                </Typography>
                <Typography
                  variant="caption"
                  style={
                    account_type_id === 2
                      ? { color: "#eb6d4a" }
                      : { color: "purple" }
                  }
                >
                  ({account_type_id === 2 ? "Mentor" : "Student"})
                </Typography>
              </Grid>

              <Grid item>
                {account_type_id === 3 ? (
                  <Grid container spacing={1} align="center">
                    <Grid item xs={6}>
                      <Paper
                        elevation={3}
                        style={{ width: "100%", height: "auto" }}
                      >
                        <Typography variant="subtitle2">Attending:</Typography>
                        <Typography
                          variant="h4"
                          style={{ background: "antiquewhite" }}
                        >
                          {
                            studentClass.filter(res => {
                              return res.class_status === true;
                            }).length
                          }
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        elevation={3}
                        style={{ width: "100%", height: "auto" }}
                      >
                        <Typography variant="subtitle2">Attended:</Typography>
                        <Typography
                          variant="h4"
                          style={{ background: "antiquewhite" }}
                        >
                          {
                            studentClass.filter(res => {
                              return res.class_status === false;
                            }).length
                          }
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : (
                  <Paper
                    elevation={3}
                    style={{ width: "100%", height: "auto" }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Classes:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="h4"
                          style={{ background: "antiquewhite" }}
                        >
                          {classList.length}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Grid>

              <Grid item>
                <ExpansionPanel
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ background: "#dadaf5" }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#2d2d2d" }}
                    >
                      {account_type_id === 2
                        ? "Classes Created"
                        : "Classes Attented/Attending"}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{ maxHeight: "30vh", overflow: "auto" }}
                  >
                    <div className={classes.root1}>
                      <List>
                        {(account_type_id === 2 ? classList : studentClass)
                          .length !== 0 ? (
                          (account_type_id === 2
                            ? classList
                            : studentClass
                          ).map(row => (
                            <div key={row.id}>
                              <ListItem>
                                <ListItemText>{row.class_name}</ListItemText>
                                <ListItemSecondaryAction>
                                  <Typography
                                    variant="caption"
                                    style={{ color: "#ff6f61ff" }}
                                  >
                                    {account_type_id === 2 ? (
                                      <Grid item>Student/s:</Grid>
                                    ) : (
                                      ""
                                    )}
                                    <Grid item style={{ fontWeight: "bold" }}>
                                      <Chip
                                        style={{ color: "gray" }}
                                        variant="outlined"
                                        size="small"
                                        avatar={
                                          <Avatar
                                            style={{
                                              background: "#ff6f61",
                                              color: "white"
                                            }}
                                          >
                                            {account_type_id === 3 ? "M" : "#"}
                                          </Avatar>
                                        }
                                        label={
                                          account_type_id === 3 ? (
                                            <UserDetails
                                              id={row.user_id}
                                              headers={headers}
                                              action="name"
                                            />
                                          ) : (
                                            classUsers &&
                                            classUsers.filter(res => {
                                              return res.class_id === row.id;
                                            }).length
                                          )
                                        }
                                        clickable
                                      />
                                    </Grid>
                                  </Typography>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </div>
                          ))
                        ) : (
                          <Typography variant="body2">Empty class</Typography>
                        )}
                      </List>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
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
