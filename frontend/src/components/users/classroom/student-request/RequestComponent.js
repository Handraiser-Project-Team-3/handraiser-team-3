import React from "react";
// Material-ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Hidden from "@material-ui/core/Hidden";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

//tabs
import Help from "@material-ui/icons/Help";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

// component/s
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import { user_details, getClassroomUserDetails } from "../../reusables/UserDetails";

export const RequestComponent = ({
	data,
	updateRequest,
	classes,
	action,
	account_type_id,
	headers,
	classroomUser,
	user,
	socket,
	setRoom
}) => {
	const [sender, setSender] = React.useState();
	React.useEffect(() => {
		if (data) {
			getClassroomUserDetails(data.student_id, headers).then(res => {
				user_details(res.data.user_id, headers).then(user =>
					setSender(user.data)
				);
			});
		}
	}, [data, headers]);

	const handleSubmitAction = (title, submit) =>
		confirmAlert({
			title: title,
			message: "Are you sure?",
			buttons: [
				{
					label: "Yes",
					onClick: submit
				},
				{
					label: "No",
					onClick: () => { }
				}
			]
		});

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Paper
			id={data.id}
			key={data.id}
			className={classes.needHelp}
			elevation={6}
		>
			<Grid container justify="space-between" alignItems="center">
				<Grid item>
					<Grid container spacing={2}>
						<Grid item>
							<div
								style={{ padding: "8px 10px 0 0" }}
								onClick={() => {
									if (
										(classroomUser.id === data.student_id ||
											account_type_id === 2) &&
										data.status === null
									) {
										setRoom(data);
									}
								}}
							>
								{sender ? (
									<img
										src={sender.user_image}
										alt="man"
										style={{ width: "30px", borderRadius: "50%" }}
									/>
								) : (
										""
									)}
							</div>
						</Grid>
						<Grid item>
							<Grid container direction="column">
								<Grid item>
									<Typography variant="body1" style={{ color: "#585fbc" }}>
										{data.title}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle2" style={{ color: "#6f6e73" }}>
										{sender ? `${sender.first_name} ${sender.last_name}` : ""}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					{action === "need" ? (
						<div className={classes.Icons}>
							{classroomUser.id === data.student_id || account_type_id === 2 ? (
								<>
									<Hidden smDown>
										<Tooltip title="Remove">
											<RemoveCircleIcon
												style={{ color: "#9da1f0", cursor: "pointer" }}
												onClick={() =>
													handleSubmitAction("Removing request ...", () => {
														socket.emit("remove_request", data, user);
														setRoom(null);
													})
												}
											/>
										</Tooltip>
									</Hidden>
									<Hidden mdUp>
										<MoreVertIcon
											size="small"
											style={{ color: "#4c54ba" }}
											onClick={handleClick}
										/>
									</Hidden>
								</>
							) : (
									<></>
								)}
							{account_type_id === 2 ? (
								<>
									<Hidden smDown>
										<Tooltip title="Help">
											<Help
												style={{ color: "#9da1f0", cursor: "pointer" }}
												onClick={() =>
													handleSubmitAction("Accepting request . . .", () => {
														updateRequest(
															data.id,
															false,
															`Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
															user.id
														);
													})
												}
											/>
										</Tooltip>
									</Hidden>
								</>
							) : (
									<></>
								)}
						</div>
					) : action === "help" ? (
						<div className={classes.Icons}>
							{account_type_id === 2 ? (
								<>
									<Hidden smDown>
										<Tooltip title="Move back to 'Need Help'">
											<AssignmentReturnIcon
												style={{ color: "#9da1f0", cursor: "pointer" }}
												onClick={() =>
													handleSubmitAction("Moving back request . . .", () =>
														updateRequest(data.id, null)
													)
												}
											/>
										</Tooltip>
										<Tooltip title="Help">
											<CheckCircleIcon
												style={{ color: "#9da1f0", cursor: "pointer" }}
												onClick={() =>
													handleSubmitAction("Ending request . . .", () =>
														updateRequest(data.id, true)
													)
												}
											/>
										</Tooltip>
									</Hidden>
									<Hidden mdUp>
										<MoreVertIcon
											size="small"
											style={{ color: "#4c54ba" }}
											onClick={handleClick}
										/>
									</Hidden>
								</>
							) : (
									<></>
								)}
						</div>
					) : (
								<div className={classes.Icons}>
									{account_type_id === 2 ? (
										<div>
											<Hidden smDown>
												<Tooltip title="Move back to 'Being Help'">
													<AssignmentReturnIcon
														style={{ color: "#9da1f0", cursor: "pointer" }}
														onClick={() =>
															handleSubmitAction("Moving back request . . .", () =>
																updateRequest(data.id, false)
															)
														}
													/>
												</Tooltip>
											</Hidden>
											<Hidden mdUp>
												<MoreVertIcon
													size="small"
													style={{ color: "#4c54ba" }}
													onClick={handleClick}
												/>
											</Hidden>
										</div>
									) : (
											<></>
										)}
								</div>
							)}
				</Grid>
			</Grid>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{action === "need" && account_type_id === 2 ? (
					<div>
						<MenuItem
							onClick={() =>
								handleSubmitAction("Removing request ...", () => {
									socket.emit("remove_request", data, user);
									setRoom(null);
									handleClose();
								})
							}
						>
							Remove
						</MenuItem>
						<MenuItem
							onClick={() =>
								handleSubmitAction("Accepting request . . .", () => {
									updateRequest(
										data.id,
										false,
										`Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
										user.id
									);
								})
							}
						>
							Help
						</MenuItem>
					</div>
				) : account_type_id === 3 ? (
					<MenuItem
						onClick={() =>
							handleSubmitAction("Removing request ...", () => {
								socket.emit("remove_request", data, user);
								setRoom(null);
								handleClose();
							})
						}
					>
						Remove
					</MenuItem>
				) : action === "help" ? (
					<div>
						<MenuItem
							onClick={() =>
								handleSubmitAction("Moving back request . . .", () =>
									updateRequest(data.id, null)
								)
							}
						>
							Back
						</MenuItem>
						<MenuItem
							onClick={() =>
								handleSubmitAction("Ending request . . .", () =>
									updateRequest(data.id, true)
								)
							}
						>
							Done
						</MenuItem>
					</div>
				) : account_type_id === 2 ? (
					<MenuItem
						onClick={() =>
							handleSubmitAction("Moving back request . . .", () =>
								updateRequest(data.id, false)
							)
						}
					>
						Back
					</MenuItem>
				) : (
									""
								)}
			</Menu>
		</Paper>
	);
};
