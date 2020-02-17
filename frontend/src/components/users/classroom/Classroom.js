import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

// Material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import ListIcon from "@material-ui/icons/List";
import CloseIcon from "@material-ui/icons/Close";

//tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Axios from "axios";
import Chip from "@material-ui/core/Chip";

// component/s
import Layout from "../reusables/Layout";
import Stats from "../reusables/Stats";
import ClassroomModal from "./student-request/RequestModal";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RequestComponent } from "./student-request/RequestComponent";

// images
import { ClassroomStyle } from "../style/Styles";
import { toast } from "react-toastify";

import {
  UserDetails,
  class_details,
  getClassroomUser
} from "../reusables/UserDetails";

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

export default function Classroom(props) {
  const classes = ClassroomStyle();
  const { classId } = props;
  const { headers, user, socket } = props.data;
  const userDetails = user ? user : {};
  const { first_name, account_type_id, id } = userDetails;
  const [value, setValue] = React.useState(0);
  const [classroomUser, setClassroomUser] = React.useState({});
  const [classroomUsersArray, setClassroomUsersArray] = React.useState([]);
  const [newRequest, addNewRequest] = React.useState(null);
  const [classDetails, setClassDetails] = React.useState({});
  const [room, setRoom] = React.useState(null);
  const [list, setList] = useState(false);
  const [verify, setVerify] = React.useState([]);
  const [isTyping, setIsTyping] = React.useState(null);

  const [requestDialog, setRequestDialog] = React.useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get classroom users
  React.useEffect(() => {
    if ((!!user && !!headers && !!classId) === true) {
      getClassroomUser(headers).then(res => {
        setVerify(
          res.data
            .filter(x => x.user_id === user.id)
            .map(x => x.class_id)
            .map(String)
        );
        setClassroomUser(res.data.filter(x => x.user_id === user.id)[0]);
        setClassroomUsersArray(
          res.data.filter(x => x.class_id === Number(classId))
        );
      });
      class_details(classId, headers).then(res => {
        setClassDetails(res.data);
      });
    }
  }, [user, headers, classId]);

  const [requests, setRequests] = React.useState([]);
  React.useEffect(() => {
    if ((!!user && !!headers) === true) {
      getClassroomUser(headers).then(res => {
        res.data &&
          setClassroomUser(res.data.filter(x => x.user_id === user.id)[0]);
      });
    }
  }, [user, headers]);
  React.useEffect(() => {
    if (!!classId) {
      socket.emit(`join_classroom`, {
        classId: classId
      });
    }
    socket.on(`update_request_list`, (data, action) => {
      setRequests(data);
      if (action === "move_back") {
        setRoom(null);
      }
    });
  }, [requests, classId]);

  React.useEffect(() => {
    socket.on(`notify`, notify => {
      alertToast(notify);
    });
  }, []);
  React.useEffect(() => {
    if (!!user) {
      (async () => {
        try {
          const res = await Axios.get(
            `/api/request/list/${props.classId}`,
            headers
          );
          setRequests(res.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user, headers]);

  const updateRequest = async ({ id, data, notify, mentor, action }) => {
    try {
      await Axios.patch(
        `/api/request/${id}`,
        { status: data, mentor_id: mentor },
        headers
      );
      socket.emit("update_request", { notify: notify, action: action });
    } catch (err) {
      console.error(err);
    }
  };
  // routes restriction
  React.useEffect(() => {
    if (verify.length) {
      if (props.classId === verify.find(x => x === props.classId)) {
        history.push(`/classroom/${props.classId}`);
      } else {
        alertToast("You are not Authorize to enter this room!");
        history.replace("/");
      }
    }
  }, [verify, match.params.id]);

  const handleSubmitNewRquest = () => {
    const obj = {
      class_id: props.classId,
      student_id: classroomUser.id,
      title: newRequest
    };
    socket.emit("add_request", obj, userDetails);
    addNewRequest("");
    setRequestDialog(false);
  };
  return (
    <Layout
      accountType={account_type_id}
      first_name={first_name}
      classId={props.classId}
    >
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <AppBar position="static" color="default" className={classes.appBar}>
            {!list ? (
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
            ) : (
              <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #3f51b5" }}
              >
                <Grid item xs={11}>
                  <Typography
                    variant="h6"
                    style={{ padding: "8px", paddingLeft: "20px" }}
                  >
                    List of Students
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <CloseIcon
                    fontSize="small"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setList(false);
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </AppBar>
          <div className={classes.root}>
            {list ? (
              classroomUsersArray.map(x => (
                <Grid
                  key={x.id}
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  style={{ padding: "10px 40px 0px 40px" }}
                >
                  <Grid item xs={3} sm={2} style={{ marginBottom: "1vh" }}>
                    <Tooltip title="View Profile">
                      <UserDetails
                        id={x.user_id}
                        headers={headers}
                        action="img"
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={9} sm={10} style={{ marginBottom: "1vh" }}>
                    <Chip
                      variant="outlined"
                      size="medium"
                      label={
                        <UserDetails
                          id={x.user_id}
                          headers={headers}
                          action="name"
                        />
                      }
                      style={{ color: "#616161", fontSize: "16px" }}
                    />
                  </Grid>
                </Grid>
              ))
            ) : (
              <>
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
                          headers={headers}
                          classroomUser={classroomUser}
                          user={userDetails}
                          socket={socket}
                          setRoom={setRoom}
                          setIsTyping={setIsTyping}
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
                          headers={headers}
                          classroomUser={classroomUser}
                          user={userDetails}
                          socket={socket}
                          setRoom={setRoom}
                          setIsTyping={setIsTyping}
                        />
                      )
                  )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {requests.map(
                    x =>
                      x.status === true &&
                      (classroomUser.id === x.student_id ||
                        account_type_id === 2) && (
                        <RequestComponent
                          key={x.id}
                          data={x}
                          updateRequest={updateRequest}
                          classes={classes}
                          action={"done"}
                          account_type_id={account_type_id}
                          headers={headers}
                          classroomUser={classroomUser}
                          user={userDetails}
                          socket={socket}
                          setRoom={setRoom}
                          setIsTyping={setIsTyping}
                        />
                      )
                  )}
                </TabPanel>
              </>
            )}
          </div>
          <div className={classes.divStyle}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: "15px" }}
            >
              {!!classDetails && (
                <Grid item>
                  <Tooltip title={classDetails.class_description}>
                    <Typography variant="h5">
                      {classDetails.class_name}
                      <UserDetails />
                    </Typography>
                  </Tooltip>
                </Grid>
              )}
              <Grid item>
                {account_type_id === 2 ? (
                  <Tooltip title="Click to view list of Students">
                    <ListIcon
                      style={{ color: "gray", cursor: "pointer" }}
                      onClick={() => setList(!list)}
                    />
                  </Tooltip>
                ) : (
                  <>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Tooltip title="Click to view list of Students">
                          <ListIcon
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => setList(!list)}
                          />
                        </Tooltip>
                      </Grid>

                      <Grid item>
                        <ClassroomModal
                          addNewRequest={addNewRequest}
                          handleSubmitNewRquest={handleSubmitNewRquest}
                          newRequest={newRequest}
                          open={requestDialog}
                          setOpen={setRequestDialog}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Stats
          room={room}
          user={userDetails}
          headers={headers}
          socket={socket}
          requests={requests}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
        />
      </Grid>
    </Layout>
  );
}

const alertToast = msg =>
  toast.info(msg, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
