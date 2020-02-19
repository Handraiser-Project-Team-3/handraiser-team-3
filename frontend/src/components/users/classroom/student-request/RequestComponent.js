import React from "react";
// Material-ui
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";

//tabs
import Help from "@material-ui/icons/Help";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

// component/s
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
	user_details,
	getClassroomUserDetails,
	getClassroomUser
} from "../../reusables/UserDetails";

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
	setRoom,
	setIsTyping
}) => {
	const [sender, setSender] = React.useState();
	const [mentor, setMentor] = React.useState();
	React.useEffect(() => {
		if (!!data && !!user) {
			getClassroomUserDetails(data.student_id, headers).then(res => {
				user_details(res.data.user_id, headers).then(user =>
					setSender(user.data)
				);
			});
			if (account_type_id === 2) {
				getClassroomUser(headers).then(res => {
					setMentor(res.data.filter(x => x.user_id === user.id)[0]);
				});
			}
		}
	}, [data, user]);
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
	return (
		<div
			onClick={() => {
				if (
					(classroomUser.id === data.student_id || account_type_id === 2) &&
					data.status !== null
				) {
					setIsTyping(null);
					setRoom(data);
				}
			}}
		>
			<Paper
				id={data.id}
				key={data.id}
				className={classes.needHelp}
				elevation={6}
				style={
					classroomUser.id === data.student_id
						? {
							background: "#e3e4f8"
						}
						: {}
				}
			>
				<Typography variant="h6" className={classes.studentsNeed}>
					{sender ? (
						<img
							src={sender.user_image}
							alt="man"
							style={{
								width: "50px",
								borderRadius: "50%",
								margin: "0 10px 0 0"
							}}
						/>
					) : (
							""
						)}
					<Div>
						<span style={{ fontSize: 16 }}>{data.title}</span>
						<span style={{ fontSize: 12 }}>
							({sender && ` ${sender.first_name} ${sender.last_name} `})
            </span>
					</Div>
				</Typography>
				{action === "need" ? (
					<div className={classes.Icons}>
						{(classroomUser.id === data.student_id ||
							account_type_id === 2) && (
								<Tooltip title="Remove">
									<RemoveCircleIcon
										style={{ ...iconStyle }}
										onClick={() =>
											handleSubmitAction("Removing request ...", () => {
												socket.emit("remove_request", data, user);
												setRoom(null);
											})
										}
									/>
								</Tooltip>
							)}
						{classroomUser.id === data.student_id && (
							<Tooltip title="Edit">
								<EditIcon
									style={{ ...iconStyle }}
									onClick={() => console.log("edit")}
								/>
							</Tooltip>
						)}
						{account_type_id === 2 && (
							<Tooltip title="Help">
								<Help
									style={{ ...iconStyle }}
									onClick={() =>
										handleSubmitAction("Accepting request . . .", () => {
											updateRequest({
												id: data.id,
												data: false,
												notify: `Mentor ${user.first_name} accepted ${sender.first_name}'s request`,
												mentor: mentor.id
											});
										})
									}
								/>
							</Tooltip>
						)}
					</div>
				) : action === "help" ? (
					<div className={classes.Icons}>
						{account_type_id === 2 && (
							<>
								<Tooltip title="Move back to 'Need Help'">
									<AssignmentReturnIcon
										style={{ ...iconStyle }}
										onClick={() =>
											handleSubmitAction("Moving back request . . .", () => {
												updateRequest({
													id: data.id,
													data: null,
													action: "move_back",
													notify: `Mentor ${user.first_name} moved ${sender.firstname}'s request back to queue`
												});
												setRoom(null);
											})
										}
									/>
								</Tooltip>
								<Tooltip title="Help">
									<CheckCircleIcon
										style={{ ...iconStyle }}
										onClick={() =>
											handleSubmitAction("Ending request . . .", () =>
												updateRequest({
													id: data.id,
													data: true,
													mentor: mentor.id,
													notify: `Mentor ${user.first_name} resolved ${sender.first_name}'s request`
												})
											)
										}
									/>
								</Tooltip>
							</>
						)}
					</div>
				) : (
							<div className={classes.Icons}>
								{account_type_id === 2 && (
									<Tooltip title="Move back to 'Being Help'">
										<AssignmentReturnIcon
											style={{ ...iconStyle }}
											onClick={() =>
												handleSubmitAction("Moving back request . . .", () =>
													updateRequest({
														id: data.id,
														data: false,
														mentor: mentor.id,
														notify: `Mentor ${user.first_name} reopenend ${sender.first_name}'s concern`
													})
												)
											}
										/>
									</Tooltip>
								)}
							</div>
						)}
			</Paper>
		</div>
	);
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const iconStyle = {
	margin: "8px",
	color: "#9da1f0"
};
