import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function EnterClass({
	classEnter,
	setOpen,
	classroomUsers,
	user,
	classId
}) {
	const [check, setCheck] = useState([]);
	const handleClickOpen = () => {
		setOpen(true);
	};
	useEffect(() => {
		setCheck(
			classroomUsers &&
				classroomUsers.filter(x => x.user_id === user.id).map(x => x.class_id)
		);
	}, [classroomUsers, user.id]);

	return (
		<>
			{check.includes(classId) ? (
				<Button
					size="small"
					style={{ color: "white" }}
					onClick={() => {
						classEnter();
					}}
				>
					Enter Class
				</Button>
			) : (
				<Button
					size="small"
					style={{ color: "white" }}
					onClick={() => {
						handleClickOpen();
					}}
				>
					Join Class
				</Button>
			)}
		</>
	);
}
