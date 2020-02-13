import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function EnterClass({
	classEnter,
	setOpen,
	classroomUsers,
	user,
	classId
}) {
	const [check, setCheck] = useState({});
	const handleClickOpen = () => {
		setOpen(true);
	};
	useEffect(() => {
		setCheck(
			classroomUsers &&
				classroomUsers
					.filter(x => x.user_id === user.id)
					.filter(x => x.class_id === classId)[0]
		);
		// eslint-disable-next-line
	}, [check]);

	return (
		<>
			{check ? (
				<Button
					size="small"
					style={{ color: "white", outline: "none" }}
					onClick={() => {
						classEnter();
					}}
				>
					Enter Class
				</Button>
			) : (
				<Button
					size="small"
					style={{ color: "white", outline: "none" }}
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
