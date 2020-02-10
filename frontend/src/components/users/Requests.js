import React from "react";

// Material-ui
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

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

//Badge

const StyledBadge = withStyles(theme => ({
	badge: {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "$ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""'
		}
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0
		}
	}
}))(Badge);

export default function Requests(props) {
	const classes = useStyles();
	const { val, need, being } = props;

	return (
		<>
			{val.map((e, i) => {
				return (
					<Paper key={i} id={e.name} className={classes.needHelp} elevation={6}>
						<Grid
							container
							justify="space-between"
							spacing={3}
							alignItems="center"
						>
							<Grid item xs={9}>
								<Typography variant="inherit" className={classes.studentsNeed}>
									<StyledBadge
										overlap="circle"
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right"
										}}
										variant="dot"
										style={{ marginRight: "15px" }}
									>
										<Avatar alt="Remy Sharp" src={student} />
									</StyledBadge>

									<Grid container direction="column">
										{" "}
										<Grid item xs={12}>
											<Typography>Every day is a new beginning</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography variant="subtitle2">{e.name}</Typography>
										</Grid>
									</Grid>
								</Typography>
							</Grid>
							{need ? (
								<Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
									<Grid container justify="flex-end" spacing={3}>
										<Grid item>
											<Tooltip title="Remove" arrow>
												<RemoveCircleOutlineIcon
													fontSize="small"
													style={{ color: "gray", cursor: "pointer" }}
												/>
											</Tooltip>
										</Grid>
										<Grid item>
											<Tooltip title="Help" arrow>
												<HelpOutlineIcon
													fontSize="small"
													style={{ color: "#ff6f61", cursor: "pointer" }}
												/>
											</Tooltip>
										</Grid>
									</Grid>
								</Grid>
							) : (
								""
							)}
							{being && !need ? (
								<Grid item xs={3} sm={2} md={1} lg={3} xl={2}>
									<Tooltip title="Remove" arrow>
										<Button>
											<RemoveCircleOutlineIcon
												fontSize="small"
												style={{ color: "gray" }}
											/>
										</Button>
									</Tooltip>
								</Grid>
							) : (
								""
							)}
						</Grid>
					</Paper>
				);
			})}
		</>
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
