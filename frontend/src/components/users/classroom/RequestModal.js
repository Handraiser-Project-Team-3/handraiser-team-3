import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Avatar from "@material-ui/core/Avatar";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
	icons: {
		width: "20px",
		cursor: "pointer",
		"&:hover": {
			width: "23px",
			borderRadius: "10%"
		}
	},
	formControl: {
		margin: theme.spacing(3)
	},
	titleOfrequest: {
		backgroundColor: "#AAAAF9",
		color: "white"
	},
	requestIcon: {
		color: "#ff6f61",
		cursor: "pointer",
		"&:hover": {
			color: "brown"
		}
	}
}));
export default function() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip title="Add Request">
				<HelpOutlineIcon
					fontSize="large"
					className={classes.requestIcon}
					onClick={handleClickOpen}
				/>
			</Tooltip>
			<Dialog
				className={classes.dialogMainContainer}
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title" className={classes.titleOfrequest}>
					Title of Request{" "}
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<TextField
							autoFocus
							variant="outlined"
							margin="normal"
							id="name"
							label="Request"
							type="email"
							fullWidth
						/>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}