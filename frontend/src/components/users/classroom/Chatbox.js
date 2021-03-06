import React from "react";
import Paper from "@material-ui/core/Paper";
import bubbles from "../../assets/images/chat-box.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import {
  user_details,
  getClassroomUserDetails
} from "../reusables/UserDetails";
import styled from "styled-components";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import { ChatBoxStyle } from "../style/Styles";
import Chip from "@material-ui/core/Chip";
import ReactHtmlParser from "react-html-parser";

export default function ChatBox(props) {
  const classes = ChatBoxStyle();
  const [messages, setMessages] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [student, setStudent] = React.useState(null);
  const [mentor, setMentor] = React.useState(null);
  const { room, user, headers, socket, isTyping, setIsTyping } = props.data;
  const [show, setShow] = React.useState(false);

  const lastMessage = React.useRef(null);
  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleClose = () => {
    setShow(true);
  };
  React.useEffect(() => {
    if (!!headers && !!room) {
      (async () => {
        try {
          const res = await Axios.get(
            `${process.env.REACT_APP_PROXY_URL}/api/messages/${room.id}`,
            headers
          );
          setMessages(res.data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [headers, room]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit(`add_message`, {
      message: {
        user_id: user.id,
        student_request_id: room.id,
        content: msg
      }
    });
    socket.emit(`is_typing`, null, room);
    setMsg("");
  };
  React.useEffect(() => {
    if (!!room) {
      socket.on(`typing`, (user, { data }) => {
        user !== null
          ? setIsTyping({ user: { ...user }, data: { ...data } })
          : setIsTyping(null);
      });
    }
    socket.on(`new_message`, message => {
      setMessages([...messages, message]);
    });
    scrollToBottom();
  }, [messages, room, socket, setIsTyping]);
  React.useEffect(() => {
    if (!!room && !!headers) {
      getClassroomUserDetails(room.student_id, headers).then(res => {
        user_details(res.data.user_id, headers).then(res =>
          setStudent(res.data)
        );
      });
      getClassroomUserDetails(room.mentor_id, headers).then(res => {
        user_details(res.data.user_id, headers).then(res =>
          setMentor(res.data)
        );
      });
    }
  }, [room, headers]);
  return (
    <Paper elevation={5} className={classes.root}>
      <Paper className={classes.top} elevation={3}>
        <Grid className={classes.topName}>
          {user && room !== null ? (
            user.account_type_id === 2 ? (
              student !== null ? (
                <Avatar src={student.user_image} />
              ) : (
                <img src={bubbles} style={{ width: 40 }} alt="" />
              )
            ) : mentor !== null ? (
              <Avatar src={mentor.user_image} />
            ) : (
              <img src={bubbles} style={{ width: 40 }} alt="" />
            )
          ) : (
            <img src={bubbles} style={{ width: 40 }} alt="" />
          )}
          <Typography
            variant="h6"
            style={{ paddingLeft: "10px", color: "#525252" }}
          >
            {user && room !== null ? (
              user.account_type_id === 2 ? (
                student !== null ? (
                  `${student.first_name} ${student.last_name}`
                ) : (
                  ""
                )
              ) : mentor !== null ? (
                <>
                  <span>
                    {mentor.first_name} {mentor.last_name}
                  </span>{" "}
                  <Chip size="small" label="Mentor" color="primary" />
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Typography>
        </Grid>
      </Paper>

      <Paper className={classes.convoBox}>
        {!show && !!room ? (
          <div
            style={{
              height: "auto",
              background: "antiquewhite",
              position: "relative"
            }}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={11}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{ padding: "10px" }}
                >
                  <Grid item>
                    <Typography style={{ color: "gray" }}>Request:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#484fb9" }}
                    >
                      “{room.title}”
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Tooltip title="Close">
                  <CloseIcon
                    fontSize="small"
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
        <Grid
          container
          direction="column"
          style={{
            padding: "20px 10px 10px 10px"
            // height: 500
          }}
        >
          {room === null && !!user ? (
            <Grid container direction="column" justify="center" align="center">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ marginTop: "20%", color: "gray" }}
                >
                  {user.account_type_id === 2
                    ? "Accept requests to help your students"
                    : "Request for Help to start a conversation with your mentor"}
                </Typography>
              </Grid>
            </Grid>
          ) : messages.length !== 0 ? (
            messages
              .filter(x => x.student_request_id === room.id)
              .map((x, i) => (
                <div key={i}>
                  <MessageBox
                    data={x}
                    headers={headers}
                    user={user}
                    index={i}
                    messages={messages}
                    isTyping={isTyping}
                  />
                </div>
              ))
          ) : (
            ""
          )}

          {isTyping !== null
            ? isTyping.user && isTyping.data
              ? isTyping.data.id === room.id && (
                  <Grid container>
                    <Avatar src={isTyping.user.user_image} />

                    <Msg
                      style={{
                        borderRadius: "20px 20px 20px 0",
                        border: "2px solid #d4d4d4"
                      }}
                    >
                      <TypingIndicator>
                        <span></span>
                        <span></span>
                        <span></span>
                      </TypingIndicator>
                    </Msg>
                  </Grid>
                )
              : ""
            : ""}
          <div ref={lastMessage} />
        </Grid>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.inputAreacontainer} elevation={6}>
          <TextField
            disabled={!room}
            variant="outlined"
            placeholder="Type your message..."
            value={msg}
            fullWidth
            style={{ overflow: "auto" }}
            onChange={e => {
              e.preventDefault();
              if (e.target.value.length !== 0) {
                socket.emit(`is_typing`, user, room);
              } else {
                socket.emit(`is_typing`, null, room);
              }
              setMsg(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={!room}
                    type="submit"
                    endIcon={
                      <SendIcon
                        style={{ color: "#5ec8d5", cursor: "pointer" }}
                      />
                    }
                  >
                    {" "}
                  </Button>
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
  const { data, headers, user, index, messages, isTyping } = props;
  const [sender, setSender] = React.useState({});
  React.useEffect(() => {
    !!headers &&
      !!data &&
      user_details(data.user_id, headers).then(res => {
        setSender(res.data);
      });
  }, [headers, data]);
  return (
    <Grid
      container
      alignItems="flex-end"
      style={{ padding: "0 5px 10px 5px" }}
      direction={user.id === data.user_id ? "row-reverse" : "row"}
    >
      {user.id !== data.user_id ? (
        isTyping === null ? (
          messages[index + 1] ? (
            messages[index + 1].user_id === data.user_id ? (
              <span style={{ width: 40 }} />
            ) : (
              <Avatar src={sender ? sender.user_image : ""} />
            )
          ) : (
            <Avatar src={sender ? sender.user_image : ""} />
          )
        ) : messages[index + 1] ? (
          messages[index + 1].user_id === data.user_id ? (
            <span style={{ width: 40 }} />
          ) : (
            <Avatar src={sender ? sender.user_image : ""} />
          )
        ) : (
          <span style={{ width: 40 }} />
        )
      ) : (
        ""
      )}
      <Msg
        style={
          user.id === data.user_id
            ? {
                borderRadius: "20px 20px 0 20px",
                background: "#ababfa"
              }
            : {
                borderRadius: "20px 20px 20px 0",
                border: "2px solid #d4d4d4",
                background: "#d4d4d4"
              }
        }
      >
        {ReactHtmlParser(data.content)}
      </Msg>
    </Grid>
  );
};

const Msg = styled.span`
  display: flex;
  position: static;
  background-color: whitesmoke;
  border: 2px solid #ababfa;
  padding: 10px 15px 10px 17px;
  margin: 0 10px 0 5px;
  max-width: 400px;
`;
const TypingIndicator = styled.span`
  span {
    display: inline-block;
    background-color: #ff6f61;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 5px;
    animation: bob 2s infinite;
  }
  span:nth-child(1) {
    animation-delay: -1s;
  }
  span:nth-child(2) {
    animation-delay: -0.85s;
  }
  span:nth-child(3) {
    animation-delay: -0.7s;
    margin-right: 0;
  }
  @keyframes bob {
    10% {
      transform: translateY(-10px);
      background-color: lightgray;
    }
    50% {
      transform: translateY(0);
      background-color: lightgray;
    }
  }
`;
