import React from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

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
		autoClose: 6000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});

export const JoinClassModal = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const [code, setCode] = React.useState("");
	const [warn, setWarn] = React.useState({ classcode: false });
	const [help, setHelp] = React.useState({ classcode: "" });
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = e => {
		setCode(e.target.value);
		if (e.target.value.length > 0) {
			setWarn({
				...warn,
				[e.target.name]: false
			});
			setHelp({
				...help,
				[e.target.name]: ""
			});
		} else {
			setWarn({
				...warn,
				[e.target.name]: true
			});
			setHelp({
				...help,
				[e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
					e.target.name.slice(1)} field is required *`
			});
		}
	};

	const warningUpdate = e => {
		if (e.target.value.length === 0) {
			setWarn({
				...warn,
				[e.target.name]: true
			});
			setHelp({
				...help,
				[e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
					e.target.name.slice(1)} field is required *`
			});
		} else {
			setHelp({
				...help,
				[e.target.name]: ""
			});
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (props.classId) {
			if (code === props.codeClass) {
				history.push(`/classroom/${props.classId}`);

				// axios
				// 	.post(`/api/classroom-users/`,
				// 		props.headers,
				// 		{
				// 				{
				// 				user_id: props.user.user_id,
				// 				class_id: props.classId,
				// 				date_joined: function (timestamp) {
				// 					moment(new Date(timestamp))
				// 						.format("YYYY-MM-DD HH:MM:SS")
				// 				}
				// 			}
				// 		})
				// 	.then(() => {
				// 		alertToast(`Welcome ${props.user.first_name}!`)
				// 	})
				// 	.catch(e => console.log(e))

			} else {
				alertToast('Invalid Code!')
			}
		}
	};

	return (
		<div>
			<ToastContainer enableMulticontainer />
			<Button
				size="small"
				style={{ color: "white" }}
				onClick={() => {
					handleClickOpen();
				}}
			>
				Join Class
			</Button>
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
						id={props.classId}
						noValidate
						className={classes.root}
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<FormControl variant="outlined">
							<InputLabel htmlFor="classcode">Class Code</InputLabel>
							<OutlinedInput
								required
								id={props.classId}
								name={props.className}
								error={warn.classcode}
								onBlur={warningUpdate}
								onChange={handleChange}
								labelWidth={85}
							/>
							<FormHelperText id={props.classId}>{help.classcode}</FormHelperText>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" form={props.classId} type="submit">
						Join Class
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
