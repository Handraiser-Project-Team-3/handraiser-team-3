import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
import Chatbox from "../users/Chatbox";
import Layout from "../users/reusables/Layout";

// images
import head from "../assets/images/bg.png";
import student from "../assets/images/student.png";

//WS
import io from "socket.io-client";
const socket = io(`localhost:3001`);
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
    backgroundColor: theme.palette.background.paper,
    width: 500,
    paddingTop: "30px",
    paddingLeft: "200px",
    "@media (max-width: 320px)": {
      paddingLeft: "0px !important"
    },

    "@media (max-width: 375px)": {
      paddingLeft: "0px !important"
    },
    "@media (max-width: 425px)": {
      paddingLeft: "0px !important"
    },
    "@media(max-width:1024px)": {
      paddingLeft: "270px"
    },
    "@media(max-width:768px)": {
      paddingLeft: "150px"
    }
  },

  header: {
    height: "auto",
    backgroundImage: `url(${head})`,
    backgroundSize: "cover",
    paddingTop: "85px"
  },
  headersIcon: {},
  color: {
    display: "flex",
    color: "gray",
    paddingLeft: "35px"
  },

  needHelp: {
    padding: "15px",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  needContainer: {
    maxHeight: 575,
    overflow: "auto",
    "@media (max-width: 320px)": {
      maxHeight: 300
    }
  },
  Icons: {
    display: "inline-flex",
    justifyContent: "space-between"
  },
  studentsNeed: {
    display: "flex",
    color: "gray",
    alignItems: "center"
  },
  studentsBeingHelp: {
    display: "flex",
    alignItems: "center",
    color: "gray"
  },
  chatBox: {
    display: "inline-flex"
  },
  appBar: {
    margin: "0px",
    background:
      "linear-gradient(207deg, rgba(171,171,250,1) 21%, rgba(255,255,255,1) 21%, rgba(255,255,255,1) 76%, rgba(171,171,250,1) 76%, rgba(171,171,250,1) 86%)"
  },
  mentorsAvatar: {
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  },
  studentsAvatar: {
    marginRight: "15px"
  }
}));
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
  const [studentDetails, setStudentDetails] = React.useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    socket.emit(`join_classroom`, {
      classId: props.match.params.id,
      username: first_name
    });
    socket.on(`update_request_list`, data => {
      setRequests(data);
    });

    return () => socket.emit(`disconnect`);
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
  React.useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await Axios.get(`/api/classroom-users`, headers);
          setStudentDetails(res.data.filter(x => x.user_id === user.id)[0]);
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
  return (
    <Layout accountType={account_type_id} first_name={first_name}>
      <div
        style={{ display: "flex", flexWrap: "wrap", alignContent: "center" }}
      >
        <div className={classes.root}>
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
              <Tab label="Being Help" {...a11yProps(1)} />
              <Tab label="Done" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <Paper className={classes.needContainer} elevation={4}>
              {requests.map(
                x =>
                  x.status === null && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      action={"need"}
                    />
                  )
              )}
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper className={classes.needContainer} elevation={6}>
              {requests.map(
                x =>
                  x.status === false && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      bool1={null}
                      action={"help"}
                    />
                  )
              )}
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper className={classes.needContainer} elevation={6}>
              {requests.map(
                x =>
                  x.status === true && (
                    <RequestComponent
                      key={x.id}
                      data={x}
                      updateRequest={updateRequest}
                      classes={classes}
                      bool1={null}
                      action={"done"}
                    />
                  )
              )}
            </Paper>
          </TabPanel>
        </div>
        <button
          onClick={() => {
            const obj = {
              class_id: props.match.params.id,
              student_id: studentDetails.id,
              title: "try2"
            };
            socket.emit("save_requests", requests);
            socket.emit("add_request", obj);
          }}
        >
          test
        </button>
        <Chatbox />
      </div>
    </Layout>
  );
}
const RequestComponent = ({ data, updateRequest, classes, action }) => {
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
        {data.title}
      </Typography>
      {action === "need" ? (
        <div className={classes.Icons}>
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
          <Tooltip title="Help">
            <Button onClick={() => updateRequest(data.id, false)}>
              <Help style={{ color: "#9da1f0" }} />
            </Button>
          </Tooltip>
        </div>
      ) : action === "help" ? (
        <div className={classes.Icons}>
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
        </div>
      ) : (
        <div className={classes.Icons}>
          <Tooltip title="Move back to 'Being Help'">
            <Button onClick={() => updateRequest(data.id, false)}>
              <AssignmentReturnIcon
                style={{ color: "#9da1f0" }}
                className={classes.removeIcon}
              />
            </Button>
          </Tooltip>
        </div>
      )}
    </Paper>
  );
};
