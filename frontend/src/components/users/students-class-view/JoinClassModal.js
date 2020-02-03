import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%"
		}
	}
}));

export const JoinClassModal = props => {
	const classes = useStyles();
	const [code, setCode] = React.useState('');
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
		setCode({
			...code,
			[e.target.name]: e.target.value
		})
		if (e.target.value.length > 0) {
			setWarn({
				...warn,
				[e.target.name]: false
			})
			setHelp({
				...help,
				[e.target.name]: ''
			})
		} else {
			setWarn({
				...warn,
				[e.target.name]: true
			})
			setHelp({
				...help,
				[e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
					e.target.name.slice(1)} field is required`
			})
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
					e.target.name.slice(1)} field is required`
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
		console.log('submitted')
	};

	return (
		<div>
			<Button
				size="small"
				style={{ color: "#4abdab" }}
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
					style={{ background: "#4abdac", color: "white" }}
				>
					{"Join Class"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-slide-description"
						style={{ marginTop: "2vh" }}
					>
						Ask your teacher for the class code, then enter it here
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<form id="code_form" className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
						<TextField
							required
							id="classcode"
							name="classcode"
							label="Class Code"
							variant="outlined"
							error={warn.classcode}
							helperText={help.classcode}
							onBlur={warningUpdate}
							onChange={handleChange}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" form="code_form" type="submit">
						Join Class
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
