import React from "react";
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
import { Admin } from "../users/Admin";
import { MentorClassView } from "../users/mentors-class-view/MentorClassView";
import { Classroom } from "../users/students-class-view/ClassSelection";
import { toast } from "react-toastify";

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
    width: "180px",
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
  const { user, setUser, setAccessToken } = props.data;
  const userDetails = user ? user : {};
  const { account_type_id, user_image } = userDetails;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = React.useState(true);

  const handleClick = () => {
    setShow(!show);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
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
            Hand Raiser{" "}
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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="BoomCamp Frontend" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "#4abdac" }}>
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
              <img src={logo} className={classes.logo} alt="logo" />
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
                      setUser();
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

      {account_type_id === 1 ? (
        <Admin data={props.data} />
      ) : account_type_id === 2 ? (
        <MentorClassView data={props.data} />
      ) : (
        <Classroom data={props.data} />
      )}
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
