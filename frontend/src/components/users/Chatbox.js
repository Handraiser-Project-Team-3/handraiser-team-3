import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import bubbles from "../assets/images/speech-bubble.svg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
	"@global": {
		"*::-webkit-scrollbar": {
			width: "0.4em"
		},
		"*::-webkit-scrollbar-track": {
			"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "whitesmoke"
		}
	},
	root: {
		margin: "28px",
		height: "70vh",

		backgroundColor: "#4abdac",

		"@media (max-width: 1024px)": {
			marginLeft: "200px"
		},
		"@media(max-width:768px)": {
			marginLeft: "60px"
		},
		"@media (max-width: 375px)": {
			width: "100%",
			height: "56vh",
			margin: "2px !important"
		},
		"@media (max-width: 425px)": {
			width: "100%",
			height: "56vh",
			margin: "2px !important"
		},
		"@media (max-width: 320px)": {
			height: "57vh",
			width: "100% !important",
			marginLeft: "2px !important"
		}
	},
	top: {
		padding: "0px",
		margin: "0px",
		height: "5.5vh",
		width: "100%"
	},
	topName: {
		padding: "8px",
		display: "flex"
	},
	MainChatBox: {
		maxHeight: 500,
		overflow: "auto",
		width: "95%",
		margin: "20px",
		height: "60vh",

		"@media (max-width: 320px)": {
			marginTop: "-20px",
			width: "100%",
			margin: "50px"
		}
	},
	convoBox: {
		backgroundColor: "whitesmoke",
		maxHeight: 500,
		height: "50vh",
		overflow: "auto",
		margin: "30px",

		"@media (max-width: 320px)": {
			maxHeight: 250,
			margin: 10
		},
		"@media (max-width: 425px)": {
			maxHeight: 350,
			margin: 10
		},

		"@media (max-width: 375px)": {
			maxHeight: 350,
			margin: 10
		}
	},
	messageArea: {
		width: "800px"
	},
	inputArea: {
		paddingTop: "5px",
		alignItems: "center",
		justifyContent: "center"
	},
	inputAreacontainer: {
		display: "flex",
		height: "8vh",
		width: "807px",
		margin: "27px",
		marginTop: "-15px",

		"@media (max-width: 1440px)": {
			width: "600px"
		},

		"@media (max-width: 425px)": {
			width: "404.5px !important",
			marginLeft: "8px",
			marginTop: "10px"
		},

		"@media (max-width: 375px)": {
			width: "356.5px !important",
			marginLeft: "8px",
			marginTop: "10px"
		},
		"@media (max-width: 320px)": {
			width: "300.5px !important",
			marginLeft: "8px",
			marginTop: "10px"
		},
		mentorAvatar: {
			position: "fixed"
		}
	}
}));

export default function ChatBox() {
	const classes = useStyles();
	const [messages, setMessages] = useState([
		{
			id: 1,
			message: "Nani?"
		},
		{
			id: 1,
			message: "Nani?"
		},
		{
			id: 2,
			reps: "eu"
		}
	]);

	return (
		<React.Fragment>
			<Paper className={classes.root}>
				<Paper className={classes.top} elevation={3}>
					<Grid className={classes.topName}>
						<Avatar alt="top" src={bubbles} />
						<Typography variant="h6">{"Mark Medes"}</Typography>
					</Grid>
				</Paper>

				{/* messages] */}
				<Paper className={classes.convoBox} elevation={6}>
					<Grid container direction="column">
						{/* {messages.map(m => {
              return ( */}
						<Grid
							style={{ display: "flex", alignItems: "center" }}
							xl={12}
							lg={12}
							item
						>
							<Grid
								container
								alignItems="center"
								justify="flex-end"
								style={{ padding: 5, paddingRight: "10px" }}
							>
								<Grid
									style={{
										display: "flex",
										justifyContent: "flex-end",
										maxWidth: "300px",
										wordBreak: " break-all"
									}}
									xl={5}
									lg={5}
									md={6}
									sm={7}
									xs={8}
									item
								>
									<span
										style={{
											display: "flex",
											justifyContent: "flex-end",
											backgroundColor: "whitesmoke",
											wordBreak: " break-all",
											border: " 2px solid #4ABDAC",
											padding: "10px",
											borderRadius: "5px 20px"
										}}
									>
										{
											"aceadssssssssssssssssssssssssssssssssssssssssssssssssssssshFKSHFjkjkdfhajkdfhjdhfjkadhjdjfajdhfjkasdhfjkadsjkfahdjfhjdkfhjdfhjdfhjsdfhjksdkjskjafhjkadhfjkdfhjkadjfhjksdfgjksdfhjksdhfjhsdfjkhdjkfhsjdkfhjsdfhjsdfhjsdfhhhhhhhhhhhhhhhhhhskdhfksadjkfdjk.ahjhdffjkadfjhfjhffjadfadfh "
										}
									</span>
								</Grid>

								<Grid
									style={{
										alignSelf: " flex-start",
										display: "flex",
										alignItems: "flex-end"
									}}
									item
								>
									<Avatar
										className={classes.mentorAvatar}
										alt="mentor"
										src="https://image.flaticon.com/icons/png/512/1866/1866089.png"
									/>
								</Grid>
							</Grid>
						</Grid>
						{/* );
            })} */}
						<Grid
							container
							alignItems="center"
							justify="flex-start"
						// style={{ padding: 5 }}
						>
							<Grid
								style={{
									margin: 5,
									alignSelf: " flex-start",
									display: "flex",
									justifyContent: "flex-start"
								}}
								item
							>
								<Avatar
									alt="student"
									src="https://image.flaticon.com/icons/svg/2302/2302834.svg"
								/>
							</Grid>

							<Grid
								style={{
									display: "flex",
									alignItems: "flex-end",
									maxWidth: "300px"
								}}
								xl={5}
								lg={5}
								md={6}
								sm={7}
								xs={8}
								item
							>
								<span
									style={{
										display: "flex",
										justifyContent: "flex-end",
										backgroundColor: "whitesmoke",
										wordBreak: " break-all",
										border: " 2px solid #F7B732",
										padding: "10px",
										borderRadius: "20px 5px"
									}}
								>
									{".ahjhdffjkadfjhfjhffjadfadfh "}
								</span>
							</Grid>
						</Grid>
					</Grid>

					{/* endofmessages */}
				</Paper>
				<Paper className={classes.inputAreacontainer} elevation={6}>
					<Grid container className={classes.inputArea}>
						<Grid
							item
							style={{
								display: "flex"
							}}
							lg={11}
							md={10}
							sm={9}
							xs={9}
						>
							<TextField
								variant="outlined"
								id="standard-basic"
								label="Type your message..."
								className={classes.messageArea}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Button endIcon={<SendIcon />}></Button>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Paper>
		</React.Fragment>
	);
}
