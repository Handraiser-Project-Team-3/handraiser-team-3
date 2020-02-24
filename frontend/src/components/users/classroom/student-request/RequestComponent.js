import React from "react";

// Material-ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import Hidden from "@material-ui/core/Hidden";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

//tabs
import Help from "@material-ui/icons/Help";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

// component/s
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditRequestModal from "./EditRequestModal";

import {
  user_details,
  getClassroomUserDetails,
  getClassroomUser
} from "../../reusables/UserDetails";

export const RequestComponent = ({
  data,
  updateRequest,
  classes,
  action,
  account_type_id,
  headers,
  classroomUser,
  user,
  socket,
  setRoom,
  setIsTyping
}) => {
  const [sender, setSender] = React.useState();
  const [mentor, setMentor] = React.useState();
  const [edit, setEdit] = React.useState({});
  const [editModal, setEditModal] = React.useState(false);

  React.useEffect(() => {
    if (!!data && !!user && !!headers) {
      getClassroomUserDetails(data.student_id, headers).then(res => {
        user_details(res.data.user_id, headers).then(user =>
          setSender(user.data)
        );
      });
      if (account_type_id === 2) {
        getClassroomUser(headers).then(res => {
          setMentor(res.data.filter(x => x.user_id === user.id)[0]);
        });
      }
    }
  }, [data, user, account_type_id, headers]);

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
          onClick: () => {}
        }
      ]
    });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onClick={() => {
        if (
          (classroomUser.id === data.student_id || account_type_id === 2) &&
          data.status !== null
        ) {
          setIsTyping(null);
          setRoom(data);
        }
      }}
    >
      <Paper
        elevation={5}
        id={data.id}
        key={data.id}
        className={classes.needHelp}
        style={
          classroomUser.id === data.student_id
            ? {
                background: "#ebeafe"
              }
            : {}
        }
      >
        <Typography variant="h6" className={classes.studentsNeed}>
          {sender ? (
            <img
              src={sender.user_image}
              alt="man"
              style={{
                width: "50px",
                borderRadius: "50%",
                margin: "0 10px 0 0"
              }}
            />
          ) : (
            ""
          )}
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="body1">{data.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="primary">
                -{sender && ` ${sender.first_name} ${sender.last_name} `}-
              </Typography>
            </Grid>
          </Grid>
        </Typography>
        {action === "need" ? (
          <div className={classes.Icons}>
            <Hidden smDown>
              {(classroomUser.id === data.student_id ||
                account_type_id === 2) && (
                <Tooltip title="Remove">
                  <RemoveCircleIcon
                    style={{
                      color: "#9da1f0",
                      cursor: "pointer",
                      marginRight: "8px"
                    }}
                    onClick={() =>
                      handleSubmitAction("Removing request ...", () => {
                        socket.emit("remove_request", data, user);
                        setRoom(null);
                      })
                    }
                  />
                </Tooltip>
              )}
              {classroomUser.id === data.student_id && (
                <Tooltip title="Edit">
                  <EditIcon
                    style={{ color: "#9da1f0", cursor: "pointer" }}
                    onClick={() => {
                      setEdit(data);
                      setEditModal(true);
                    }}
                  />
                </Tooltip>
              )}
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon
                size="small"
                style={{ color: "#4c54ba" }}
                onClick={handleClick}
              />
            </Hidden>

            {account_type_id === 2 && (
              <Hidden smDown>
                <Tooltip title="Help">
                  <Help
                    style={{ color: "#9da1f0", cursor: "pointer" }}
                    onClick={() =>
                      handleSubmitAction("Accepting request . . .", () => {
                        updateRequest({
                          id: data.id,
                          data: false,
                          notify: `Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
                          mentor: mentor.id
                        });
                      })
                    }
                  />
                </Tooltip>
              </Hidden>
            )}
          </div>
        ) : action === "help" ? (
          <div className={classes.Icons}>
            {account_type_id === 2 && (
              <>
                <Hidden smDown>
                  <Tooltip title="Move back to 'Need Help'">
                    <AssignmentReturnIcon
                      style={{
                        marginRight: "8px",
                        color: "#9da1f0",
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        handleSubmitAction("Moving back request . . .", () => {
                          updateRequest({
                            id: data.id,
                            data: null,
                            action: "move_back",
                            notify: `Mentor ${user.first_name} moved ${sender.first_name}'s request back to queue`
                          });
                          setRoom(null);
                        })
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Help">
                    <CheckCircleIcon
                      style={{ color: "#9da1f0", cursor: "pointer" }}
                      onClick={() =>
                        handleSubmitAction("Ending request . . .", () =>
                          updateRequest({
                            id: data.id,
                            data: true,
                            mentor: mentor.id,
                            notify: `Mentor ${user.first_name} resolved ${sender.first_name}'s request`
                          })
                        )
                      }
                    />
                  </Tooltip>
                </Hidden>
                <Hidden mdUp>
                  <MoreVertIcon
                    size="small"
                    style={{ color: "#4c54ba" }}
                    onClick={handleClick}
                  />
                </Hidden>
              </>
            )}
          </div>
        ) : (
          <div className={classes.Icons}>
            {account_type_id === 2 && (
              <>
                <Hidden smDown>
                  <Tooltip title="Move back to 'Being Help'">
                    <AssignmentReturnIcon
                      style={{ color: "#9da1f0", cursor: "pointer" }}
                      onClick={() =>
                        handleSubmitAction("Moving back request . . .", () =>
                          updateRequest({
                            id: data.id,
                            data: false,
                            mentor: mentor.id,
                            notify: `Mentor ${user.first_name} reopenend ${sender.first_name}'s concern`
                          })
                        )
                      }
                    />
                  </Tooltip>
                </Hidden>
                <Hidden mdUp>
                  <MoreVertIcon
                    size="small"
                    style={{ color: "#4c54ba" }}
                    onClick={handleClick}
                  />
                </Hidden>
              </>
            )}
          </div>
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {action === "need" && account_type_id === 2 ? (
            <div>
              <MenuItem
                onClick={() =>
                  handleSubmitAction("Removing request ...", () => {
                    socket.emit("remove_request", data, user);
                    setRoom(null);
                  })
                }
              >
                Remove
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleSubmitAction("Accepting request . . .", () => {
                    updateRequest({
                      id: data.id,
                      data: false,
                      notify: `Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
                      mentor: mentor.id
                    });
                  })
                }
              >
                Help
              </MenuItem>
            </div>
          ) : account_type_id === 3 ? (
            <span>
              <MenuItem
                onClick={() =>
                  handleSubmitAction("Removing request ...", () => {
                    socket.emit("remove_request", data, user);
                    setRoom(null);
                  })
                }
              >
                Remove
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setEdit(data);
                  setEditModal(true);
                }}
              >
                Edit
              </MenuItem>
            </span>
          ) : action === "help" ? (
            <div>
              <MenuItem
                onClick={() =>
                  handleSubmitAction("Moving back request . . .", () => {
                    updateRequest({
                      id: data.id,
                      data: null,
                      action: "move_back",
                      notify: `Mentor ${user.first_name} moved ${sender.firstname}'s request back to queue`
                    });
                    setRoom(null);
                  })
                }
              >
                Back
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleSubmitAction("Ending request . . .", () =>
                    updateRequest({
                      id: data.id,
                      data: true,
                      mentor: mentor.id,
                      notify: `Mentor ${user.first_name} resolved ${sender.first_name}'s request`
                    })
                  )
                }
              >
                Done
              </MenuItem>
            </div>
          ) : account_type_id === 2 ? (
            <MenuItem
              onClick={() =>
                handleSubmitAction("Moving back request . . .", () =>
                  updateRequest({
                    id: data.id,
                    data: false,
                    mentor: mentor.id,
                    notify: `Mentor ${user.first_name} reopenend ${sender.first_name}'s concern`
                  })
                )
              }
            >
              Back
            </MenuItem>
          ) : (
            ""
          )}
        </Menu>
      </Paper>
      <EditRequestModal
        edit={edit}
        setEdit={setEdit}
        open={editModal}
        setOpen={setEditModal}
        socket={socket}
      />
    </div>
  );
};
