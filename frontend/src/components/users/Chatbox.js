import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import bubbles from "../assets/images/chat-box.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import student from "../assets/images/student.png";
import mentor from "../assets/images/mentor2.png";

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
		padding: "15px",
		borderRadius: "10px",
		backgroundColor: "#ababfa",
		width: "45%",
		"@media(max-width:1024px)": {
			width: "100%"
		}
	},
	top: {
		padding: "0px",
		margin: "0px",
		width: "100%"
	},
	topName: {
		padding: "8px",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
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
		margin: "10px 0 10px 0 ",

		"@media (max-width: 320px)": {
			maxHeight: 250
		},
		"@media (max-width: 425px)": {
			maxHeight: 350
		},

		"@media (max-width: 375px)": {
			maxHeight: 350
		}
	},
	inputArea: {
		paddingTop: "5px",
		alignItems: "center",
		justifyContent: "center"
	},
	inputAreacontainer: {
		display: "flex",
		"@media (max-width: 1024px)": {
			margin: "0px "
		},
		mentorAvatar: {
			position: "fixed"
		}
	}
}));

export default function ChatBox() {
	const classes = useStyles();


	return (
		<React.Fragment>
			<Paper className={classes.root}>
				<Paper className={classes.top} elevation={3}>
					<Grid className={classes.topName}>
						<Avatar alt="top" src={bubbles} />
						<Typography variant="h6" style={{ paddingLeft: "10px" }}>
							Mark Medes
						</Typography>
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
											border: " 2px solid #ababfa",
											padding: "10px",
											borderRadius: "5px 20px"
										}}
									>
										{
											"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum"
										}
									</span>
								</Grid>

								<Grid
									style={{
										alignSelf: " flex-end",
										display: "flex",
										alignItems: "flex-end"
									}}
									item
								>
									<Avatar
										className={classes.mentorAvatar}
										alt="mentor"
										src={mentor}
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
									alignSelf: " flex-end",
									display: "flex",
									justifyContent: "flex-start"
								}}
								item
							>
								<Avatar alt="student" src={student} />
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
					<TextField
						variant="outlined"
						id="standard-basic"
						label="Type your message..."
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Button endIcon={<SendIcon />}></Button>
								</InputAdornment>
							)
						}}
					/>
					{/* </Grid>
          </Grid> */}
				</Paper>
			</Paper>
		</React.Fragment>
	);
}
