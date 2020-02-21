import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../assets/images/logo-1.png";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ClassIcon from "@material-ui/icons/Class";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import { GoogleLogout } from "react-google-login";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: "140px",
    marginTop: "0.5vh"
  },
  pad: {
    paddingLeft: "3px"
  },
  list: {
    width: 250
  },

  nested: {
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(52,52,181,1) 0%, rgba(92,117,190,1) 27%, rgba(171,171,250,1) 68%, rgba(255,255,255,1) 100%)",
      color: "whitesmoke"
    }
  },
  enrolled: {
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(52,52,181,1) 0%, rgba(92,117,190,1) 27%, rgba(171,171,250,1) 68%, rgba(255,255,255,1) 100%)",
      color: "whitesmoke"
    }
  }
}));

export default function ButtonAppBar(props) {
  const { user, setUser, setAccessToken, headers, socket } = props.data;
  const userDetails = user ? user : {};
  const { user_image, id, account_type_id } = userDetails;

  const history = useHistory();
  const MyComponent = props.component;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(true);
  const [classRoom, setClassRoom] = useState([]);
  const classId = props.match && props.match.params.id;
  const [state, setState] = React.useState({
    left: false
  });
  // React.useEffect(() => {
  //   axios.get(`/api/user/6`, headers).then(re => console.log(re));
  // }, [headers]);
  const handleClass = () => {
    history.push("/");
  };
  const handleClick = () => {
    setShow(!show);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setClassRoom([]);
  };
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    axios.get(`/api/classroom-users`, headers).then(e => {
      Promise.all(
        e.data
          .filter(userdata => {
            return userdata.user_id === id;
          })
          .map(res =>
            axios(`/api/class/${res.class_id}`, headers).then(res => {
              return res.data;
            })
          )
      ).then(response => setClassRoom(response));
    });
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, true)}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Hand Raiser
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button className={classes.nested}>
          <ClassIcon />

          <ListItemText
            primary="Classes"
            onClick={handleClass}
            style={{ width: "20px", paddingLeft: "20px" }}
          />
        </ListItem>

        <ListItem
          button
          onClick={handleClick}
          style={{ display: account_type_id >= 2 ? "flex" : "none" }}
          className={classes.enrolled}
        >
          <InboxIcon />

          <ListItemText
            primary={account_type_id === 2 ? "Subjects Handled" : "Enrolled"}
            style={{ width: "20px", paddingLeft: "20px" }}
          />
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!show} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {classRoom &&
              classRoom.map(
                rooms =>
                  rooms.class_status === true && (
                    <Link to={`/classroom/${rooms.id}`} key={rooms.id}>
                      <ListItem
                        id={2}
                        key={rooms.id}
                        button
                        className={classes.nested}
                      >
                        <StarBorder />

                        <ListItemText
                          style={{
                            width: "20px",
                            paddingLeft: "20px"
                          }}
                        >
                          {" "}
                          {rooms.class_name}
                        </ListItemText>
                      </ListItem>
                    </Link>
                  )
              )}
          </List>
        </Collapse>
      </List>
    </div>
  );
  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{
            background:
              "linear-gradient(90deg, rgba(52,52,181,1) 0%, rgba(92,117,190,1) 27%, rgba(171,171,250,1) 68%, rgba(255,255,255,1) 100%)"
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={account_type_id !== 1 && toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
              {sideList("left")}
            </Drawer>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">
                <img src={logo} className={classes.logo} alt="logo" />
              </Link>
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <User src={user_image} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <GoogleLogout
                    clientId="98171074423-7khn6bi88f89ncbg6ev5ps5f962kdmlo.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => {
                      setAccessToken("");
                      setUser({});
                      history.push("/");
                      alertToast("Successfully logged out!");
                      socket.off();
                    }}
                    render={renderProps => (
                      <Btn onClick={renderProps.onClick}>
                        <ExitToAppIcon fontSize="small" />
                        <span className={classes.pad}>Logout</span>
                      </Btn>
                    )}
                  />
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <MyComponent data={props.data} classId={classId} />
    </>
  );
}
const Btn = styled.span`
  display: flex;
  align-items: center;
`;
const alertToast = msg =>
  toast.info(msg, {
    position: "top-right",
    hideProgressBar: true,
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
const User = styled.img`
  border-radius: 50%;
  width: 35px;
`;