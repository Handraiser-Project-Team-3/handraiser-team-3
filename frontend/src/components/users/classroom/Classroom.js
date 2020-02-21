import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";
//tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Axios from "axios";

// component/s
import Layout from "../reusables/Layout";
import Stats from "../reusables/Stats";
import ClassroomModal from "./student-request/RequestModal";
import ClassDescription from "../reusables/ClassDescription";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RequestComponent } from "./student-request/RequestComponent";
import Profile from "../reusables/Profile";
import NotifyRemoved from "../reusables/NotifyRemoved";

import { confirmAlert } from "react-confirm-alert";

// images
import {
  ClassroomStyle,
  StyledBadgeGreen,
  StyledBadgeWhite
} from "../style/Styles";
import { toast } from "react-toastify";

import {
  UserDetails,
  class_details,
  getClassroomUser,
  user_details
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
  const { first_name, account_type_id } = userDetails;
  const [value, setValue] = React.useState(0);
  const [classroomUser, setClassroomUser] = React.useState({});
  const [classroomUsersArray, setClassroomUsersArray] = React.useState([]);
  const [newRequest, addNewRequest] = React.useState(null);
  const [classDetails, setClassDetails] = React.useState({});
  const [room, setRoom] = React.useState(null);
  const [list, setList] = useState(false);
  const [isTyping, setIsTyping] = React.useState(null);

  const [notifyRemovedUser, setNotifyRemovedUser] = useState(false);
  const [closedClass, setClosedClass] = useState(false);
  const [requestDialog, setRequestDialog] = React.useState(false);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (!!classId) {
      socket.on(`classroom_user`, data => {
        setClassroomUsersArray(
          data.filter(x => x.class_id === Number(classId))
        );
      });
      socket.on(`removed_user`, ({ classList }) => {
        classList.filter(classX => classX.id === classId).length === 0 &&
          setNotifyRemovedUser(true);
      });
      socket.on(`notify_class`, ({ data }) => {
        data[0].id === Number(classId) && setClosedClass(true);
      });
    }
  }, [classId, socket]);

  React.useEffect(() => {
    if (!!classroomUser && !!classId) {
      socket.on(`notify_removed_user`, data => {
        data.id === classroomUser.id && setNotifyRemovedUser(true);
      });
    }
  }, [classroomUser, classId, socket]);

  React.useEffect(() => {
    if ((!!user && !!headers && !!classId) === true) {
      getClassroomUser(headers).then(res => {
        setClassroomUser(
          res.data.filter(
            x => x.user_id === user.id && x.class_id === Number(classId)
          )[0]
        );
        setClassroomUsersArray(
          res.data.filter(x => x.class_id === Number(classId))
        );
      });
      class_details(classId, headers).then(res => {
        setClassDetails(res.data);
        res.data.class_status === false && setClosedClass(true);
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
      socket.on(`update_request_list`, (data, action) => {
        setRequests(data);
        if (action === "move_back" || action === "remove") {
          setRoom(null);
        }
      });
    }
    return () => socket.emit(`leave_class`, { classId: classId });
  }, [classId, socket]);

  React.useEffect(() => {
    socket.on(`notify`, notify => {
      alertToast(notify);
    });
  }, [socket]);
  React.useEffect(() => {
    if (!!user && !!headers && !!classId) {
      (async () => {
        try {
          const res = await Axios.get(`/api/request/list/${classId}`, headers);
          setRequests(res.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user, headers, classId]);

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
    if (!classroomUser) {
      alertToast("You are not Authorized to enter this room!");
      history.replace("/");
    }
  }, [classroomUser, history]);

  const handleSubmitNewRquest = () => {
    const obj = {
      class_id: classId,
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
      headers={headers}
    >
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <ClassDescription classDetails={classDetails} />
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
                      Members
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
                  <Grid item xs={11}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs={3} sm={2} style={{ marginBottom: "1vh" }}>
                        <OnlineIndicator data={x} headers={headers} />
                      </Grid>
                      <Grid item xs={9} sm={10} style={{ marginBottom: "1vh" }}>
                        <Profile userId={x.user_id} headers={headers} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    {account_type_id === 2 && x.user_id !== user.id && (
                      <RemoveUserComponent
                        data={x}
                        headers={headers}
                        socket={socket}
                        setRoom={setRoom}
                      />
                    )}
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

          <ClassroomModal
            addNewRequest={addNewRequest}
            newRequest={newRequest}
            handleSubmitNewRquest={handleSubmitNewRquest}
            open={requestDialog}
            setOpen={setRequestDialog}
            setList={setList}
            list={list}
            account_type_id={account_type_id}
            requests={requests}
            classroomUser={classroomUser}
          />
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
        <NotifyRemoved
          open={notifyRemovedUser}
          setOpen={setNotifyRemovedUser}
          action={"removed_user"}
        />
        <NotifyRemoved
          open={closedClass}
          setOpen={setClosedClass}
          action={"class_closed"}
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
    closeOnClick: true
  });

const OnlineIndicator = ({ data, headers }) => {
  const [member, setMember] = React.useState({});

  React.useEffect(() => {
    if (!!data && !!headers) {
      user_details(data.user_id, headers).then(res => setMember(res.data));
    }
  }, [data, headers]);
  return (
    <>
      {!!member ? (
        member.user_status ? (
          <StyledBadgeGreen
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <UserDetails id={data.user_id} headers={headers} action="img" />
          </StyledBadgeGreen>
        ) : (
            <StyledBadgeWhite
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              variant="dot"
            >
              <UserDetails id={data.user_id} headers={headers} action="img" />
            </StyledBadgeWhite>
          )
      ) : (
          ""
        )}
    </>
  );
};

const RemoveUserComponent = ({ data, headers, socket, setRoom }) => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    if (!!data && !!headers) {
      user_details(data.user_id, headers).then(res => setUser(res.data));
    }
  }, [data, headers]);
  return (
    <Tooltip title="Remove from class">
      <RemoveIcon
        fontSize="small"
        color="secondary"
        cursor="pointer"
        onClick={() => {
          handleSubmitAction(
            `Remove ${!!user && user.first_name} from class?`,
            () => {
              setRoom(null);
              socket.emit(`remove_class_user`, {
                userId: data.id,
                classroomId: data.class_id
              });
            }
          );
        }}
      />
    </Tooltip>
  );
};

const handleSubmitAction = (title, submit) =>
  confirmAlert({
    title: title,
    message: " ",
    buttons: [
      {
        label: "Yes",
        onClick: submit
      },
      {
        label: "No",
        onClick: () => {}
      }
    ]
  });
