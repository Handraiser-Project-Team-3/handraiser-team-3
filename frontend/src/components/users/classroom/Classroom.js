import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

// Material-ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styled from "styled-components";
import ListIcon from "@material-ui/icons/List";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";

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
import Chip from "@material-ui/core/Chip";

// component/s
import Layout from "../reusables/Layout";
import Stats from "../reusables/Stats";
import ClassroomModal from "./RequestModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import student from "../../assets/images/student.png";
import { useStyles } from "./classroomStyle";
import { toast } from "react-toastify";
import blackboard from "../../assets/images/blackboard.png";

//WS
import { UserDetails } from "../reusables/UserDetails";

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
   const { headers, user, socket } = props.data;
   const userDetails = user ? user : {};
   const { first_name, last_name, account_type_id } = userDetails;
   const [value, setValue] = React.useState(0);
   const [classroomUser, setClassroomUser] = React.useState({});
   const [newRequest, addNewRequest] = React.useState("");
   const [list, setList] = useState(false);
   const [requests, setRequests] = React.useState([]);
   const [verify, setVerify] = React.useState([]);
   const history = useHistory();
   const match = useRouteMatch();

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   // get classroom users
   React.useEffect(() => {
      if (user) {
         getClassroomUser(headers).then(res => {
            setVerify(res.data
               .filter(x => x.user_id === user.id)
               .map(x => x.class_id)
               .map(String)
            )
            setClassroomUser(res.data.filter(x => x.user_id === user.id)[0])
         });
      }
   }, [user, headers]);

   // socketio
   React.useEffect(() => {
      socket.emit(`join_classroom`, {
         classId: props.classId
      });
      socket.on(`update_request_list`, (data, notify) => {
         setRequests(data);
         if (!!notify) {
            alertToast(notify);
         }
      })
   }, [user, headers]);
   React.useEffect(() => {
      socket.emit(`join_classroom`, {
         classId: props.classId
      });
      socket.on(`update_request_list`, (data, notify) => {
         setRequests(data);
         if (!!notify) {
            alertToast(notify);
         }
      });
   }, []);

   // routes restriction
   React.useEffect(() => {
      if (verify.length) {
         if (props.classId === verify.find(x => x === props.classId)) {
            history.push(`/classroom/${props.classId}`)
         } else {
            alertToast('You are not Authorize to enter this room!')
            history.replace('/')
         }
      }
   }, [verify, match.params.id])

   // get requests
   React.useEffect(() => {
      if (user) {
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
         class_id: props.classId,
         student_id: classroomUser.id,
         title: newRequest
      };
      socket.emit("add_request", obj, userDetails);
   };

   const handleClickList = () => {
      setList(true);
   };

   return (
      <Layout accountType={account_type_id} first_name={first_name}>
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
                                 style={{ padding: "7px", paddingLeft: "20px" }}
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
                        // </Tabs>
                     )}
               </AppBar>
               <div className={classes.root}>
                  {list ? (
                     <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        style={{ padding: "40px" }}
                     >
                        <Grid item xs={3} sm={2} style={{ marginBottom: "1vh" }}>
                           <Tooltip title="View Profile">
                              <Avatar alt="Student" src={student} />
                           </Tooltip>
                        </Grid>
                        <Grid item xs={9} sm={10} style={{ marginBottom: "1vh" }}>
                           <Chip
                              variant="outlined"
                              size="medium"
                              label="Lyza Mae Mirabete"
                              style={{ color: "#616161", fontSize: "16px" }}
                           />
                        </Grid>
                     </Grid>
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
                     <Grid item>
                        <Grid container spacing={5} alignItems="center">
                           <Grid item xs={4}>
                              <Avatar
                                 className={classes.studentsAvatar}
                                 alt="Student"
                                 src={account_type_id === 2 ? "" : student}
                              />
                           </Grid>
                           <Grid item xs={8}>
                              <Typography variant="h6">
                                 {account_type_id === 2
                                    ? "Mentor"
                                    : first_name + " " + last_name}
                                 <UserDetails />
                              </Typography>
                           </Grid>
                        </Grid>
                     </Grid>
                     <Grid item>
                        {account_type_id === 2 ? (
                           <Tooltip title="Click to view list of Students">
                              <ListIcon
                                 style={{ color: "gray", cursor: "pointer" }}
                                 onClick={() => {
                                    handleClickList();
                                 }}
                              />
                           </Tooltip>
                        ) : (
                              <>
                                 <Grid container spacing={1}>
                                    <Grid item>
                                       <Tooltip title="Click to view list of Students">
                                          <ListIcon
                                             style={{ color: "gray", cursor: "pointer" }}
                                             onClick={() => {
                                                handleClickList();
                                             }}
                                          />
                                       </Tooltip>
                                    </Grid>

                                    <Grid item>
                                       <ClassroomModal
                                          addNewRequest={addNewRequest}
                                          handleSubmitNewRquest={handleSubmitNewRquest}
                                       />
                                    </Grid>
                                 </Grid>
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

const RequestComponent = ({
   data,
   updateRequest,
   classes,
   action,
   account_type_id,
   headers,
   classroomUser,
   user,
   socket
}) => {
   const [sender, setSender] = React.useState();
   React.useEffect(() => {
      if (data) {
         getStudentDetails(headers, data.student_id).then(res => {
            setSender(res.data);
         });
      }
   }, [data]);
   const handleSubmitAction = (title, submit) =>
      confirmAlert({
         title: title,
         message: "Are you sure?",
         buttons: [
            {
               label: "Yes",
               onClick: submit
            },
            {
               label: "No",
               onClick: () => { }
            }
         ]
      });
   return (
      <Paper
         id={data.id}
         key={data.id}
         className={classes.needHelp}
         elevation={6}
      >
         <Avatar
            className={classes.studentsAvatar}
            alt="Student"
            src={student}
            onClick={() => socket.emit(`join_chatroom`, { requestId: data.id })}
         />
         <Div>
            <Typography variant="body2" className={classes.studentsNeed}>
               <span style={{ fontSize: 16, wordBreak: "break-all" }}>
                  {data.title}
               </span>
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
            </Typography>
         </Div>
         {action === "need" ? (
            <div className={classes.Icons}>
               {classroomUser.id === data.student_id || account_type_id === 2 ? (
                  <Tooltip title="Remove">
                     <Button
                        onClick={() =>
                           handleSubmitAction("Removing request ...", () =>
                              socket.emit("remove_request", data, user)
                           )
                        }
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
                     <Button
                        onClick={() =>
                           handleSubmitAction("Accepting request . . .", () =>
                              updateRequest(data.id, false)
                           )
                        }
                     >
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
                        <Button
                           onClick={() =>
                              handleSubmitAction("Moving back request . . .", () =>
                                 updateRequest(data.id, null)
                              )
                           }
                        >
                           <AssignmentReturnIcon
                              style={{ color: "#9da1f0" }}
                              className={classes.removeIcon}
                           />
                        </Button>
                     </Tooltip>
                     <Tooltip title="Help">
                        <Button
                           onClick={() =>
                              handleSubmitAction("Ending request . . .", () =>
                                 updateRequest(data.id, true)
                              )
                           }
                        >
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
                           <Button
                              onClick={() =>
                                 handleSubmitAction("Moving back request . . .", () =>
                                    updateRequest(data.id, false)
                                 )
                              }
                           >
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
const alertToast = msg =>
   toast.info(msg, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
   });
