import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PaperStat } from "../reusables/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

// images
import Layout from "../reusables/Layout";

// components
import AddEmail from "./AddEmail";
import Confirmation from "./HandleUsers";
import MentorDetails from "./MentorDetails";

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: "#a5a5a5",
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default
		}
	}
}))(TableRow);

const useStyles = makeStyles({
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
	table: {
		minWidth: 700,
		overflow: "auto"
	},
	mentor: {
		width: "20px",
		marginRight: "10px"
	},
	gridStyle: {
		height: "8vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#d2efeb",
		borderTopLeftRadius: "5px",
		borderBottomLeftRadius: "5px"
	},
	paperStyle: {
		height: "8vh",
		background: "white",
		marginBottom: "2vh"
	},
	tableHeight: {
		height: "74vh"
	},
	filter: {
		cursor: "pointer",
		color: "#3f51b5",
		"&:hover": {
			color: "gray"
		}
	}
});
export const Admin = props => {
	const classes = useStyles();
	const [accountType] = useState("Admin");
	const { user, headers } = props.data;
	const userDetails = user ? user : {};
	const { first_name } = userDetails;
	const [users, setUsers] = useState([]);
	const [userType, setUserType] = useState(3);
	const [open, setOpen] = useState(false);
	const [handle, setHandle] = useState("");
	const [details, setDetails] = useState({});

	useEffect(() => {
		// DISPLAY LIST
		axios.get("/api/user/list", headers).then(res => {
			setUsers(res.data);
		});
	}, []);

	const deleteClass = classid => {
		axios
			.delete(`/api/user/${classid}`, headers)
			.then(() => setUsers(users.filter(data => data.id !== classid)));
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = row => {
		setDetails(row);
		setOpen(true);
		setHandle("remove");
	};

	return (
		<Layout accountType={accountType} first_name={first_name}>
			<ToastContainer enableMulticontainer />
			<Grid container direction="row" spacing={2}>
				<Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
					<Paper className={classes.paperStyle}>
						<AddEmail headers={headers} setUsers={setUsers} users={users} />
					</Paper>
					<PaperStat users={users} />
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
					<TableContainer component={Paper} className={classes.tableHeight}>
						<Table className={classes.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>
										<span>Email Address</span>
									</StyledTableCell>
									<StyledTableCell align="center">Role</StyledTableCell>
									<StyledTableCell
										align="right"
										style={{ paddingRight: "80px" }}
									>
										Action
									</StyledTableCell>
									<TableCell align="right" style={{ background: "#e1e2f7" }}>
										<Tooltip title="Filter List">
											<FilterListIcon
												onClick={handleClick}
												className={classes.filter}
											/>
										</Tooltip>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map(
									row =>
										row.account_type_id === userType && (
											<StyledTableRow key={row.id}>
												<StyledTableCell component="th" scope="row">
													<MentorDetails email={row.email} />
												</StyledTableCell>
												<StyledTableCell
													component="th"
													scope="row"
													align="center"
												>
													<Chip
														variant="outlined"
														size="medium"
														label={userType === 3 ? "Student" : "Mentor"}
														style={
															userType === 3
																? { borderColor: "#aaaafa", color: "#616161" }
																: { borderColor: "#f7b733", color: "#616161" }
														}
													/>
												</StyledTableCell>
												<StyledTableCell align="right">
													{row.account_type_id === 3 && (
														<>
															<Chip
																variant="outlined"
																size="medium"
																avatar={
																	<Avatar
																		style={{
																			background: "#aaaafa",
																			color: "white"
																		}}
																	>
																		<FaceIcon />
																	</Avatar>
																}
																label="Set as Mentor"
																onClick={() => {
																	setDetails(row);
																	setOpen(true);
																	setHandle("set");
																}}
																style={{
																	borderColor: "#aaaafa",
																	color: "#616161"
																}}
															/>
															{/* <Button onClick={() => deleteClass(row.id)}>
																delete
															</Button> */}
														</>
													)}
													{row.account_type_id === 2 && (
														<>
															{/* <MentorDetails /> */}
															<Chip
																variant="outlined"
																size="medium"
																label="Remove as Mentor"
																onDelete={() => handleDelete(row)}
																color="primary"
															/>
														</>
													)}
												</StyledTableCell>
												<TableCell style={{ width: "20px" }}></TableCell>
											</StyledTableRow>
										)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
			<Confirmation
				setOpen={setOpen}
				open={open}
				details={details}
				headers={headers}
				handle={handle}
				setUsers={setUsers}
			/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => setUserType(3)}>Student</MenuItem>
				<MenuItem onClick={() => setUserType(2)}>Mentor</MenuItem>
			</Menu>
		</Layout>
	);
};
