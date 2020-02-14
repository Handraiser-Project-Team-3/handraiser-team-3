import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import "react-confirm-alert/src/react-confirm-alert.css";

//components
import Search from "./Search";
const useStyles = makeStyles(theme => ({
	blackboard: {
		width: "35px",
		padding: "0"
	},
	classStyle: {
		color: "#474db8",
		paddingLeft: "20px",
		borderLeft: "10px solid #ff6f61",
		textShadow: "1px 1px #f09c70"
	},
	addClass: {
		cursor: "pointer",
		color: "#8e9493"
	},
	margin: {
		margin: theme.spacing(1)
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "#bfe8e2",
		"&:hover": {
			backgroundColor: "#efefef"
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3)
		},
		"@media (max-width: 415px)": {
			marginBottom: "2vh"
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
		}
	}
}));
export default function ClassHead(props) {
	const classes = useStyles();
	const {
		account_type_id,
		setOpen,
		setAction,
		setHeadTitle,
		filter,
		setClassList
	} = props;

	const handleClickOpenAdd = () => {
		setOpen(true);
		setAction("Add");
		setHeadTitle("Add");
	};

	return (
		<>
			<Grid container direction="row" justify="space-between">
				<Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
					<Grid
						container
						direction="row"
						alignItems="center"
						spacing={5}
						style={{ marginBottom: "1vh" }}
					>
						<Grid item>
							<Grid
								container
								direction="row"
								alignItems="center"
								spacing={3}
								style={{ marginBottom: "1vh" }}
							>
								<Grid item>
									<Typography variant="h4" className={classes.classStyle}>
										CLASSROOMS
									</Typography>
								</Grid>
								{account_type_id === 2 ? (
									<Grid item>
										<Tooltip title="Add Class">
											<AddCircleOutlineIcon
												fontSize="default"
												className={classes.addClass}
												onClick={() => {
													handleClickOpenAdd();
												}}
											/>
										</Tooltip>
									</Grid>
								) : (
									""
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
					<Search filter={filter} setClassList={setClassList} />
				</Grid>
			</Grid>
		</>
	);
}
