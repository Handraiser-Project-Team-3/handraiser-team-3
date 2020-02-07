import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import styled from "styled-components";

//tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Help from "@material-ui/icons/Help";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

// component/s
import Layout from "../reusables/Layout";
import Stats from "../reusables/Stats";
import ClassroomModal from "./RequestModal";

// images
import student from "../../assets/images/student.png";

//WS
import io from "socket.io-client";
import { UserDetails } from "../reusables/UserDetails";
const socket = io(`localhost:3001`);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = index => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
};

export default function MentorsView(props) {
  const classes = useStyles();
  const { headers, user } = props.data;
  const userDetails = user ? user : {};
  const { first_name, account_type_id, id } = userDetails;
  const [value, setValue] = React.useState(0);
  const [classroomUser, setClassroomUser] = React.useState({});
  const [newRequest, addNewRequest] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [requests, setRequests] = React.useState([]);
  React.useEffect(() => {
    if (user) {
      getClassroomUser(headers).then(res =>
        setClassroomUser(res.data.filter(x => x.user_id === user.id)[0])
      );
    }
  }, [user, headers]);
  React.useEffect(() => {
    socket.emit(`join_classroom`, {
      classId: props.match.params.id
    });
    socket.on(`update_request_list`, data => {
      setRequests(data);
    });
  }, [user]);
  React.useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await Axios.get(
            `/api/request/list/${props.match.params.id}`,
            headers
          );
          setRequests(res.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user, headers]);

  const updateRequest = async (id, data) => {
    try {
      await Axios.patch(`/api/request/${id}`, { status: data }, headers);
      socket.emit("update_request");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitNewRquest = e => {
    e.preventDefault();
    const obj = {
      class_id: props.match.params.id,
      student_id: classroomUser.id,
      title: newRequest
    };
    socket.emit("add_request", obj);
  };
  return (
    <Layout accountType={account_type_id} first_name={first_name}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Need Help" {...a11yProps(0)} />
              <Tab label="Being Helped" {...a11yProps(1)} />
              <Tab label="Done" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <div className={classes.root}>
            <TabPanel value={value} index={0}>
              {requests.map(
                x =>
                  x.status === null && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      action={"need"}
                      account_type_id={account_type_id}
                      user_id={id}
                      headers={headers}
                      classroomUser={classroomUser}
                    />
                  )
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {requests.map(
                x =>
                  x.status === false && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      action={"help"}
                      account_type_id={account_type_id}
                      user_id={id}
                      headers={headers}
                      classroomUser={classroomUser}
                    />
                  )
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {requests.map(
                x =>
                  x.status === true && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      action={"done"}
                      account_type_id={account_type_id}
                      user_id={id}
                      headers={headers}
                      classroomUser={classroomUser}
                    />
                  )
              )}
            </TabPanel>
          </div>
          <div className={classes.divStyle}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: "15px" }}
            >
              <Grid item>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={4}>
                    <Avatar
                      className={classes.studentsAvatar}
                      alt="Student"
                      src={student}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      {account_type_id === 2 ? "Mentor" : ""} <UserDetails />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {account_type_id === 2 ? (
                  <></>
                ) : (
                  <>
                    <ClassroomModal
                      addNewRequest={addNewRequest}
                      handleSubmitNewRquest={handleSubmitNewRquest}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Stats />
      </Grid>
    </Layout>
  );
}

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
    background:
      "linear-gradient(0deg, rgba(171,171,250,1) 0%, rgba(255,255,255,1) 64%)",
    border: "1px solid lightgray",
    height: "65vh",
    overflow: "auto",
    padding: "0"
  },
  needHelp: {
    padding: "15px",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  studentsNeed: {
    display: "flex",
    alignItems: "center",
    color: "gray"
  },
  appBar: {
    background: "#f1f0fa"
  },
  studentsAvatar: {
    marginRight: "10px"
  },
  divStyle: {
    width: "100%",
    height: "auto",
    background: "#eff1fa",
    marginTop: "0.5vh",
    border: "1px solid lightgray",
    borderRadius: "5px"
  }
}));
const RequestComponent = ({
  data,
  updateRequest,
  classes,
  action,
  account_type_id,
  user_id,
  headers,
  classroomUser
}) => {
  const [sender, setSender] = React.useState();
  React.useEffect(() => {
    if (data) {
      getStudentDetails(headers, data.student_id).then(res => {
        setSender(res.data);
      });
    }
  }, [data]);
  return (
    <Paper
      id={data.id}
      key={data.id}
      className={classes.needHelp}
      elevation={6}
    >
      {" "}
      <Typography variant="h7" className={classes.studentsNeed}>
        <Avatar
          className={classes.studentsAvatar}
          alt="Student"
          src={student}
        />
        <Div>
          <span style={{ fontSize: 16 }}>{data.title}</span>
          <span style={{ fontSize: 12 }}>
            {sender ? (
              <UserDetails
                id={sender.user_id}
                headers={headers}
                action="name"
              />
            ) : (
              ""
            )}
          </span>
        </Div>
      </Typography>
      {action === "need" ? (
        <div className={classes.Icons}>
          {classroomUser.id === data.student_id || account_type_id === 2 ? (
            <Tooltip title="Remove">
              <Button
                onClick={() => {
                  socket.emit("remove_request", data);
                }}
              >
                <RemoveCircleIcon
                  style={{ color: "#9da1f0" }}
                  className={classes.removeIcon}
                />
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
          {account_type_id === 2 ? (
            <Tooltip title="Help">
              <Button onClick={() => updateRequest(data.id, false)}>
                <Help style={{ color: "#9da1f0" }} />
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      ) : action === "help" ? (
        <div className={classes.Icons}>
          {account_type_id === 2 ? (
            <>
              <Tooltip title="Move back to 'Need Help'">
                <Button onClick={() => updateRequest(data.id, null)}>
                  <AssignmentReturnIcon
                    style={{ color: "#9da1f0" }}
                    className={classes.removeIcon}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Help">
                <Button onClick={() => updateRequest(data.id, true)}>
                  <CheckCircleIcon style={{ color: "#9da1f0" }} />
                </Button>
              </Tooltip>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className={classes.Icons}>
          {account_type_id === 2 ? (
            <Tooltip title="Move back to 'Being Help'">
              <Button onClick={() => updateRequest(data.id, false)}>
                <AssignmentReturnIcon
                  style={{ color: "#9da1f0" }}
                  className={classes.removeIcon}
                />
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      )}
    </Paper>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const getStudentDetails = async (headers, id) => {
  try {
    return await Axios.get(`/api/classroom-users/${id}`, headers);
  } catch (err) {
    console.log(err);
  }
};
const getClassroomUser = async headers => {
  try {
    return await Axios.get(`/api/classroom-users`, headers);
  } catch (err) {
    console.log(err);
  }
};
