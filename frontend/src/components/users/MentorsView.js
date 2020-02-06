import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
// component/s
import AddClassRoom from "./classroomModal";
import Chatbox from "./Chatbox";
import Layout from "./reusables/Layout";

// images
import head from "../assets/images/bg.png";
import student from "../assets/images/student.png";
import nodata from "../assets/images/nodata.png";
//Tabs
const TabPanel = props => {
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
};

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

export default function MentorsView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [val, setVal] = React.useState([
    {
      id: 2,
      name: "Stephen Dunn"
    },
    { id: 3, name: "Nathan Young " },
    {
      id: 4,
      name: "Crystal Watson"
    },
    {
      id: 5,
      name: "George Wells"
    }
  ]);
  const [history] = React.useState([
    {
      history: 0
    }
  ]);

  return (
    <Layout>
      <div
        style={{ display: "flex", flexWrap: "wrap", alignContent: "center" }}
      >
        <div className={classes.root}>
          <AppBar position="static" color="default" className={classes.appBar}>
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
            <Paper className={classes.needContainer} elevation={4}>
              {val.map(e => {
                console.log(e);

                return (
                  <Paper key={e.id} className={classes.needHelp} elevation={6}>
                    {" "}
                    <div className={classes.studentsNeed}>
                      <Avatar
                        className={classes.studentsAvatar}
                        alt="Student"
                        src={student}
                      />
                      <Typography>{e.name}</Typography>
                    </div>
                    <div className={classes.Icons}>
                      <Tooltip title="Remove">
                        <Button>
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            style={{ color: "gray" }}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Help">
                        <Button>
                          <HelpOutlineIcon
                            fontSize="small"
                            style={{ color: "#f7b731" }}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </Paper>
                );
              })}
            </Paper>
            <div className={classes.modalButton}>
              <AddClassRoom />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper className={classes.needContainer} elevation={6}>
              {val.map(e => {
                return (
                  <Paper key={e.id} className={classes.needHelp} elevation={6}>
                    {" "}
                    <div className={classes.studentsNeed}>
                      <Avatar
                        className={classes.studentsAvatar}
                        alt="Student"
                        src={student}
                      />
                      <Typography className={classes.studentsBeingHelp}>
                        {e.name}
                      </Typography>
                    </div>
                    <div
                      className={classes.Icons}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Tooltip title="Remove">
                        <Button>
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            style={{ color: "gray" }}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </Paper>
                );
              })}
            </Paper>
            <div className={classes.modalButton}>
              <AddClassRoom />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper className={classes.needContainer} elevation={6}>
              {history === 1 ? (
                <Paper className={classes.needHelp} elevation={6}>
                  <div className={classes.studentsNeed}>
                    <Avatar
                      className={classes.studentsAvatar}
                      alt="Student"
                      src={student}
                    />
                    <Typography className={classes.studentsBeingHelp}>
                      Papa Rex Rojo
                    </Typography>
                  </div>
                </Paper>
              ) : (
                <Paper
                  elevation={6}
                  style={{
                    margin: "40px",
                    marginTop: "100px"
                    // backgroundColor: "#ABABFA"
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Typography variant="h6">No Data</Typography>
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap"
                    }}
                  >
                    <img src={nodata} width="50%" />
                  </div>
                </Paper>
              )}
            </Paper>

            <div className={classes.modalButton}>
              <AddClassRoom />
            </div>
          </TabPanel>
        </div>
        <Chatbox />
      </div>
    </Layout>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "whitesmoke"
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    paddingTop: "30px",
    paddingLeft: "160px",
    "@media(max-width:1440px)": {
      paddingLeft: "0px"
    },
    "@media (max-width: 320px)": {
      paddingLeft: "0px !important"
    },

    "@media (max-width: 375px)": {
      paddingLeft: "0px !important"
    },
    "@media (max-width: 425px)": {
      paddingLeft: "0px !important"
    },
    "@media(max-width:1024px)": {
      paddingLeft: "200px"
    },
    "@media(max-width:768px)": {
      paddingLeft: "95px"
    }
  },

  header: {
    height: "auto",
    backgroundImage: `url(${head})`,
    backgroundSize: "cover",
    paddingTop: "85px"
  },
  headersIcon: {},
  color: {
    display: "flex",
    color: "gray",
    paddingLeft: "35px"
  },

  needHelp: {
    padding: "15px",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  needContainer: {
    height: 580,
    overflow: "auto",
    "@media (max-width: 320px)": {
      maxHeight: 300
    }
  },
  Icons: {
    display: "inline-flex",
    justifyContent: "space-between",
    width: " 100px",
    paddingRight: "20px"
  },
  studentsNeed: {
    display: "flex",
    color: "gray"
  },
  studentsBeingHelp: {
    display: "flex",
    color: "gray"
  },
  chatBox: {
    display: "inline-flex"
  },
  appBar: {
    margin: "0px"
  },
  mentorsAvatar: {
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  },
  modalButton: {
    marginTop: "-50px ",
    marginLeft: "10px"
  }
}));
