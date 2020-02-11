import React from "react";
import Paper from "@material-ui/core/Paper";
import bubbles from "../../assets/images/chat-box.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./chatboxStyle";
import { user_details } from "../reusables/UserDetails";
import styled from "styled-components";
import Axios from "axios";

export default function ChatBox(props) {
  const classes = useStyles();
  const [messages, setMessages] = React.useState([]);
  const [roomMsg, setRoomMsg] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [student, setStudent] = React.useState(null)
  const [mentor, setMentor] = React.useState(null)
  const { room, user, headers } = props.data;
  React.useEffect(() => {
    if (room) {
      setRoomMsg(messages.filter(x => x.student_request_id === room.id));
    }
  }, [room, messages]);
  const handleSubmit = e => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        user_id: user.id,
        student_request_id: room.id,
        content: msg
      }
    ]);
    setMsg("");
  };
  React.useEffect(() => {
    if (room) {
      getStudentDetails(headers, room.student_id).then(res => {
        user_details(res.data.user_id, headers).then(res =>
          setStudent(res.data)
        );
      });
      (async () => {
        try {
          const res = await Axios.get(`/api/class/${room.class_id}`, headers);
          user_details(res.data.user_id, headers).then(res =>
            setMentor(res.data)
          );
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [room]);
  return (
    <Paper className={classes.root}>
      <Paper className={classes.top} elevation={3}>
        <Grid className={classes.topName}>
            {user
              ? user.account_type_id === 2
                ? student !== null
                      ? <Avatar src={student.user_image} />
                      : <img src={bubbles} style={{width: 45}}/>
                : mentor !== null
                      ? <Avatar src={mentor.user_image} />
                      : <img src={bubbles} style={{width: 45}}/>
              :  <img src={bubbles} style={{width: 45}}/>}
          <Typography
            variant="h6"
            style={{ paddingLeft: "10px", color: "#525252" }}
          >
            {user
              ? user.account_type_id === 2
                ? student  !== null
                      ? `${student.first_name} ${student.last_name}`
                      : ""
                : mentor  !== null
                      ? `${mentor.first_name} ${mentor.last_name} [Mentor]`
                      : ""
              : ""}
          </Typography>
        </Grid>
      </Paper>

      <Paper className={classes.convoBox} elevation={6}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {room === null
            ? "request help to start a conversation with your mentor"
            : roomMsg.length !== 0
            ? roomMsg.map((x, i) => (
                <MessageBox
                  data={x}
                  headers={headers}
                  user={user}
                  key={x.id}
                  index={i}
                  roomMsg={roomMsg}
                />
              ))
            : "start conversation"}
        </div>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.inputAreacontainer} elevation={6}>
          <TextField
            disabled={!room}
            variant="outlined"
            label="Type your message..."
            value={msg}
            fullWidth
            onChange={e => {
              e.preventDefault();
              setMsg(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    endIcon={
                      <SendIcon
                        style={{ color: "#5ec8d5", cursor: "pointer" }}
                      />
                    }
                  ></Button>
                </InputAdornment>
              )
            }}
          />
        </Paper>
      </form>
    </Paper>
  );
}
const MessageBox = props => {
  const classes = useStyles();
  const { data, headers, user, index, roomMsg } = props;
  const [sender, setSender] = React.useState({});
  React.useEffect(() => {
    user_details(data.user_id, headers).then(res => {
      setSender(res.data);
    });
  }, []);
  return (
    <Div
      style={
        user.id !== data.user_id
          ? {
              "flex-direction": "row-reverse"
            }
          : {
              "flex-direction": "row"
            }
      }
    >
      {user.id === data.user_id ? (
        roomMsg[index + 1] ? (
          roomMsg[index + 1].user_id === data.user_id ? (
            <span style={{ width: 40 }} />
          ) : (
            <Avatar src={sender ? sender.user_image : ""} />
          )
        ) : (
          <Avatar src={sender ? sender.user_image : ""} />
        )
      ) : (
        ""
      )}
      <Msg
        style={
          user.id !== data.user_id
            ? {
                "border-radius": "20px 20px 0 20px",
                background: "#ababfa"
              }
            : {
                "border-radius": "20px 20px 20px 0",
                border: "2px solid #ff6f61"
              }
        }
      >
        {data.content}
      </Msg>
    </Div>
  );
};
const Div = styled.div`
  padding: 0 5px 10px 5px;
  display: flex;
  align-items: flex-end;
`;
const Msg = styled.span`
  display: flex;
  background-color: whitesmoke;
  border: 2px solid #ababfa;
  padding: 10px 15px 10px 17px;
  margin: 0 5px 0 5px;
  max-width: 400px;
`;
const getStudentDetails = async (headers, id) => {
  try {
    return await Axios.get(`/api/classroom-users/${id}`, headers);
  } catch (err) {
    console.log(err);
  }
};
