import React from "react";
// Material-ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styled from "styled-components";

//tabs
import Help from "@material-ui/icons/Help";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

// component/s
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import { toast } from "react-toastify";

import { user_details, getStudentDetails } from "../../reusables/UserDetails";

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
  setRoom
}) => {
  const [sender, setSender] = React.useState();
  React.useEffect(() => {
    if (data) {
      getStudentDetails(data.student_id, headers).then(res => {
        user_details(res.data.user_id, headers).then(user =>
          setSender(user.data)
        );
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
          onClick: () => {}
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
      <Typography variant="h6" className={classes.studentsNeed}>
        <div
          style={{ padding: "8px 10px 0 0" }}
          onClick={() => {
            if (
              (classroomUser.id === data.student_id || account_type_id === 2) &&
              data.status === null
            ) {
              setRoom(data);
            }
          }}
        >
          {sender ? (
            <img
              src={sender.user_image}
              alt="man"
              style={{ width: "30px", borderRadius: "50%" }}
            />
          ) : (
            ""
          )}
        </div>
        <Div>
          <span style={{ fontSize: 16 }}>{data.title}</span>
          <span style={{ fontSize: 12 }}>
            {sender ? `${sender.first_name} ${sender.last_name}` : ""}
          </span>
        </Div>
      </Typography>
      {action === "need" ? (
        <div className={classes.Icons}>
          {classroomUser.id === data.student_id || account_type_id === 2 ? (
            <Tooltip title="Remove">
              <Button
                onClick={() =>
                  handleSubmitAction("Removing request ...", () => {
                    socket.emit("remove_request", data, user);
                    setRoom(null);
                  })
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
                  handleSubmitAction("Accepting request . . .", () => {
                    updateRequest(
                      data.id,
                      false,
                      `Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
                      user.id
                    );
                  })
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
