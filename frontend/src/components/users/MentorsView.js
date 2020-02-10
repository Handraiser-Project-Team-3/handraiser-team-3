import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
// import Badge from "@material-ui/core/Badge";

// component/s
import Layout from "../users/reusables/Layout";
import Stats from "../users/reusables/Stats";
import ClassroomModal from "../users/classroomModal";
import Requests from "./Requests";

// images
import student from "../assets/images/student.png";

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
	const [need] = React.useState(true);
	const [being] = React.useState(true);
	const [done] = React.useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [val, setVal] = React.useState([
		{
			name: "Stephen Dunn"
		},
		{
			name: "Stephen Dunn"
		}
	]);
	return (
		<Layout>
			<Grid container justify="flex-start" spacing={2}>
				<Grid item xs={12} sm={12} md={12} lg={4}>
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
							<Tab label="Being Helped" {...a11yProps(1)} />
							<Tab label="Done" {...a11yProps(2)} />
						</Tabs>
					</AppBar>
					<div className={classes.root}>
						<TabPanel value={value} index={0}>
							<Requests val={val} value={value} need={need} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Requests val={val} value={value} being={being} />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Requests val={val} value={value} done={done} />
						</TabPanel>
					</div>
					<div className={classes.divStyle}>
						<Grid
							container
							justify="space-between"
							alignItems="center"
							style={{ padding: "15px" }}
						>
							<Grid item>
								<Grid container spacing={3} alignItems="center">
									<Grid item xs={4}>
										<Avatar
											className={classes.studentsAvatar}
											alt="Student"
											src={student}
										/>
									</Grid>
									<Grid item xs={8}>
										<Typography variant="h6">Eric Atento</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<ClassroomModal />
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Stats />
			</Grid>
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
		background:
			"linear-gradient(0deg, rgba(171,171,250,1) 0%, rgba(255,255,255,1) 64%)",
		border: "1px solid lightgray",
		height: "65vh",
		overflow: "auto",
		padding: "0"
	},
	needHelp: {
		padding: "15px",
		margin: "20px",
		display: "flex",
		justifyContent: "space-between"
	},
	studentsNeed: {
		display: "flex",
		alignItems: "center",
		color: "gray"
	},
	appBar: {
		// background:
		// 	"linear-gradient(207deg, rgba(171,171,250,1) 15%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 86%, rgba(171,171,250,1) 86%)"
		background: "#f1f0fa"
	},
	studentsAvatar: {
		marginRight: "10px"
	},
	divStyle: {
		width: "100%",
		height: "auto",
		background: "#eff1fa",
		marginTop: "0.5vh",
		border: "1px solid lightgray",
		borderRadius: "5px"
	}
}));
