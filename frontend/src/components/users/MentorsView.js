import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

//tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
// component/s
import Navigation from "../navigation/NavBar";
import Chatbox from "../users/Chatbox";
// images
import head from "../assets/images/bg.png";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    paddingTop: "30px",
    paddingLeft: "200px",
    "@media (max-width: 320px)": {
      paddingLeft: "0px"
    },
    "@media (max-width: 375px)": {
      paddingLeft: "0px"
    },
    "@media (max-width: 425px)": {
      paddingLeft: "0px"
    }
  },
  header: {
    height: "auto",
    backgroundImage: `url(${head})`,
    backgroundSize: "cover",
    paddingTop: "85px"
  },
  color: {
    display: "flex",
    color: "gray",
    paddingLeft: "35px"
  },

  needHelp: {
    paddingTop: "20px",
    margin: "20px",
    width: "90%",
    display: "flex",
    justifyContent: "space-between"
    // justifyContent: "space-around"
  },
  needContainer: {
    maxHeight: 500,
    overflow: "auto"
  },
  Icons: {
    display: "inline-flex",
    justifyContent: "space-between",
    width: " 100px",
    paddingRight: "20px",
    marginTop: "-20px"
  },
  studentsNeed: {
    display: "flex",
    color: "gray",
    marginTop: "-10px"
  },
  studentsBeingHelp: {
    display: "flex",
    color: "gray",
    marginTop: "-10px"
  },
  chatBox: {
    display: "inline-flex"
  }
}));

//Tabs
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function MentorsView() {
  const classes = useStyles();
  //   const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper elevation={0} className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={9} md={10} lg={10}>
            <Typography variant="h5" className={classes.color}>
              <Avatar
                alt="Mentor"
                src="https://image.flaticon.com/icons/png/512/522/522301.png"
              />
              Mentor Dan
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Need Help" {...a11yProps(0)} />
              <Tab label="Being Help" {...a11yProps(1)} />
              <Tab label="Done" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <Paper className={classes.needContainer}>
              <Paper className={classes.needHelp}>
                {" "}
                <Typography variant="h7" className={classes.studentsNeed}>
                  <Avatar
                    alt="Student"
                    src="https://image.flaticon.com/icons/png/512/522/522301.png"
                  />
                  Edward Nayve
                </Typography>
                <div className={classes.Icons}>
                  <Tooltip title="Remove">
                    <Button>
                      <RemoveCircleIcon className={classes.removeIcon} />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Help">
                    <Button>
                      <LiveHelpIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Paper>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper className={classes.needContainer}>
              <Paper className={classes.needHelp}>
                {" "}
                <Typography variant="h7" className={classes.studentsBeingHelp}>
                  <Avatar
                    alt="Student"
                    src="https://image.flaticon.com/icons/png/512/522/522301.png"
                  />
                  Papa Rex Rojo
                </Typography>
                <div className={classes.Icons}>
                  {/* <Tooltip title="Remove">
                    <Button>
                      <RemoveCircleIcon className={classes.removeIcon} />
                    </Button>
                  </Tooltip> */}
                </div>
              </Paper>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper className={classes.needContainer}>
              <Paper className={classes.needHelp}>
                {" "}
                <Typography variant="h7" className={classes.studentsBeingHelp}>
                  <Avatar
                    alt="Student"
                    src="https://image.flaticon.com/icons/png/512/522/522301.png"
                  />
                  Papa Rex Rojo
                </Typography>
                <div className={classes.Icons}>
                  <Tooltip title="Remove">
                    <Button>
                      <RemoveCircleIcon className={classes.removeIcon} />
                    </Button>
                  </Tooltip>
                </div>
              </Paper>
            </Paper>
          </TabPanel>
        </div>
        <Chatbox />
      </div>
    </div>
  );
}
