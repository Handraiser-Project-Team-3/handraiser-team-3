import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(1),
		width: "250px"
	},
	icons: {
		width: "20px",
		cursor: "pointer",
		"&:hover": {
			width: "23px",
			borderRadius: "10%"
		}
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const alertToast = msg =>
	toast.info(msg, {
		position: "bottom-right",
		hideProgressBar: true,
		autoClose: 6000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});

export const Modal = props => {
	const classes = useStyles();
	const {
		open,
		setOpen,
		headTitle,
		action,
		setClassRoom,
		classRoom,
		headers,
		userId,
		setClassList,
		classList
	} = props;

	const isEnabled =
		classRoom.class_name.length > 0 && classRoom.class_description.length > 0;

	const handleClose = () => {
		setOpen(false);
		setClassRoom({
			class_name: "",
			class_description: ""
		});
	};

	const handleInput = e => {
		const { name, value } = e.target;
		setClassRoom({
			...classRoom,
			[name]: value
		});
	};

	const handleClass = e => {
		e.preventDefault();
		if (action === "Add") {
			axios
				.post(
					"/api/class",
					{
						user_id: userId,
						class_code: Math.random()
							.toString(36)
							.substring(2, 10),
						class_status: true,
						...classRoom
					},
					headers
				)
				.then(res => {
					setOpen(false);
					setClassList([...classList, res.data]);
					setClassRoom({
						class_name: "",
						class_description: ""
					});
					alertToast("Successfully Added a New Class!");
				});
		} else {
			axios
				.patch(
					`/api/class/${classRoom.id}`,
					{
						...classRoom
					},
					headers
				)
				.then(() =>
					axios.get(`/api/class?id=${userId}`, headers).then(res => {
						setClassList(res.data);
						setOpen(false);
						setClassRoom({
							class_name: "",
							class_description: ""
						});
					})
				);
		}
	};

	return (
		<div>
			<ToastContainer enableMulticontainer />

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle
					id="responsive-dialog-title"
					style={{
						background: "#ababfa",
						color: "white"
					}}
				>
					{headTitle} {" Class"}
				</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handleClass}
						className={classes.root}
						noValidate
						autoComplete="off"
					>
						<TextField
							label="Class Name"
							variant="outlined"
							name="class_name"
							value={classRoom.class_name}
							style={{ width: "100%", marginBottom: "1vh" }}
							onChange={handleInput}
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Description"
							name="class_description"
							multiline
							rowsMax="4"
							value={classRoom.class_description}
							variant="outlined"
							style={{ width: "100%" }}
							onChange={handleInput}
						/>

						<DialogActions>
							<Button autoFocus onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button
								type="submit"
								color="primary"
								autoFocus
								disabled={!isEnabled}
							>
								{action}
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
