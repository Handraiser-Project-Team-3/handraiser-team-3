import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "95%"
		}
	}
}));

const alertToast = msg =>
	toast.info(msg, {
		position: "top-right",
		hideProgressBar: true,
		autoClose: 3000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});

export const JoinClassModal = props => {
	const classes = useStyles();
	const { classId, className, codeClass, user, headers } = props;
	const history = useHistory();
	const [code, setCode] = useState("");
	const [open, setOpen] = useState(false);
	const [classroomUsers, setClassroomUsers] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/classroom-users/`, headers)
			.then(classUsers => {
				setClassroomUsers(classUsers.data)
			})
			.catch(e => console.log(e))
		// let filterUser = classroomUsers.filter(userClass => {
		// 	if (user.id) {
		// 		if (userClass.user_id === user.id) {
		// 			return userClass;
		// 		}
		// 		return null;
		// 	}

		// 	if (filterUser) {
		// 		history.push(`/classroom/${classId}`)
		// 	} else {
		// 		history.push('/')
		// 	}
		// })
	}, [])

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = e => {
		setCode(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (classId) {
			if (code === codeClass) {
				let data = {
					user_id: user.id,
					class_id: classId
				}
				axios
					.post(`/api/classroom-users/`, data, headers)
					.then(() => {
						classEnter();
					})
					.catch(e => console.log(e))
			} else {
				if (code === "") {
					alertToast("Code required to enter class!");
				} else {
					alertToast('Invalid Code!');
				}
			}
		}
	};

	const classEnter = () => {
		history.push(`/classroom/${classId}`)
	}

	const ButtonComponent = () => {
		let filterUser = classroomUsers.filter(userClass => {
			if (user.id) {
				if (userClass.user_id === user.id) {
					return userClass;
				}
				return null;
			}
		})
		console.log(filterUser)

		if (filterUser) {
			return (
				<Button
					size="small"
					style={{ color: "white" }}
					onClick={() => {
						handleClickOpen();
					}}
				>
					Join Class
				</Button>
			)
		}
		return (
			<Button
				size="small"
				style={{ color: "white" }}
				onClick={() => {
					classEnter();
				}}
			>
				Enter Class
			</Button>
		)
	}

	return (
		<div>
			<ToastContainer enableMulticontainer />
			<ButtonComponent />
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle
					id="alert-dialog-slide-title"
					style={{ background: "#ababfa", color: "white" }}
				>
					{"Join Class"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-slide-description"
						style={{ marginTop: "1vh" }}
					>
						Ask your teacher for the class code, then enter it here
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<form
						id={classId}
						noValidate
						className={classes.root}
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<FormControl variant="outlined">
							<InputLabel htmlFor="classcode">Class Code</InputLabel>
							<OutlinedInput
								required
								id="classId"
								name={className}
								onChange={handleChange}
								labelWidth={85}
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" form={classId} type="submit">
						Join Class
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
