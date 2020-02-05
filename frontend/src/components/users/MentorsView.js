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
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
// component/s
import AddClassRoom from "./classroomModal";
import Chatbox from "../users/Chatbox";
import Layout from "../users/reusables/Layout";

// images
import head from "../assets/images/bg.png";


//Tabs
const TabPanel = (props) => {
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

const a11yProps = (index) => {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`
	};
}

export default function MentorsView() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [val, setVal] = React.useState([
		{
			name: "Stephen Dunn"
		},
		{
			name: "Nathan Young "
		},
		{
			name: "Crystal Watson"
		},
		{
			name: "George Wells"
		},
		{
			name: "Willie Foster 5"
		},
		{
			name: "Kathy Ellis"
		},
		{
			name: "Kathy Ellis"
		},
		{
			name: "Kathy Ellis"
		},
		{
			name: "Kathy Ellis"
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
                  <Paper id={e.name} className={classes.needHelp} elevation={6}>
                    {" "}
                    <Typography className={classes.studentsNeed}>
                      <Avatar
                        className={classes.studentsAvatar}
                        alt="Student"
                        src="https://image.flaticon.com/icons/png/512/522/522301.png"
                      />
                      {e.name}
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
                  <Paper className={classes.needHelp} elevation={6}>
                    {" "}
                    <Typography className={classes.studentsBeingHelp}>
                      <Avatar
                        className={classes.studentsAvatar}
                        alt="Student"
                        src="https://image.flaticon.com/icons/png/512/522/522301.png"
                      />
                      {e.name}
                    </Typography>
                    <div className={classes.Icons}>
                      <Tooltip title="Remove">
                        <Button>
                          <RemoveCircleIcon className={classes.removeIcon} />
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
              <Paper className={classes.needHelp} elevation={6}>
                {" "}
                <Typography className={classes.studentsBeingHelp}>
                  <Avatar
                    className={classes.studentsAvatar}
                    alt="Student"
                    src="https://image.flaticon.com/icons/png/512/522/522301.png"
                  />
                  Papa Rex Rojo
                </Typography>
              </Paper>
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
		paddingLeft: "200px",
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
			paddingLeft: "270px"
		},
		"@media(max-width:768px)": {
			paddingLeft: "150px"
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
    marginTop: "-65px ",
    marginLeft: "12px"
  }
}));