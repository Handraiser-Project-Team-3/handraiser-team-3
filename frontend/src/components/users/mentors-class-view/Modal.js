import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "500"
		}
	},
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
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = props => {
	const classes = useStyles();
	const { open, setOpen, headTitle, action } = props;
	const [value, setValue] = useState("");

	const handleChange = event => {
		setValue(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
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
						background: "#4abdac",
						color: "white"
					}}
				>
					{headTitle} {" Class"}
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<TextField
							label="Class Name"
							variant="outlined"
							value=""
							style={{ width: "95%" }}
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Details"
							multiline
							rowsMax="4"
							value=""
							variant="outlined"
							style={{ width: "95%" }}
						/>
					</form>
				</DialogContent>

				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" autoFocus>
						{action}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
