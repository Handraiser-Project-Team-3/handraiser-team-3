import React, { useState, useEffect } from "react";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
  }
}));

export default function ButtonAppBar(props) {
  const { user, setUser, setAccessToken, headers } = props.data;
  const userDetails = user ? user : {};
  const { user_image, id } = userDetails;
  const history = useHistory();
  const MyComponent = props.component;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(true);
  const [classRoom, setClassRoom] = useState([]);
  const [state, setState] = React.useState({
    left: false
  });

  const changeClass = classId => {
    console.log(classId);
    history.push(`/classroom/${classId}`);
  };
  const handleClick = () => {
    setShow(!show);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  useEffect(() => {
    axios.get(`api/classroom-users`, headers).then(e => {
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
    // eslint-disable-next-line
  }, [id]);

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
        <ListItem button>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Enrolled" />
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!show} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {classRoom &&
              classRoom.map(rooms => (
                <ListItem
                  id={2}
                  key={rooms.id}
                  button
                  className={classes.nested}
                  onClick={() => changeClass(rooms.id)}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText>{rooms.class_name}</ListItemText>
                </ListItem>
              ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
  return (
    <div>
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
              onClick={toggleDrawer("left", true)}
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

      <MyComponent
        data={props.data}
        classId={props.match && props.match.params.id}
      />
    </div>
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
