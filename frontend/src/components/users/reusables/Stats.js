import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// component/s
import Chatbox from "../classroom/Chatbox";

// images
import question from "../../assets/images/question.png";

export default function MentorsView(props) {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={12} md={12} lg={8}>
			<Grid container>
				<Grid item xs={12}>
					<Grid container spacing={1} className={classes.margin}>
						<Grid item xs={12} sm={12} md={6} lg={4}>
							<Paper elevation={3} className={classes.paperStyle}>
								<Grid
									container
									alignItems="center"
									align="center"
									style={{ background: "#d9d9f4" }}
								>
									<Grid
										item
										xs={4}
										sm={3}
										style={{ background: "#aaaafa", width: "auto" }}
									>
										<img src={question} className={classes.help} alt="help" />
									</Grid>
									<Grid item xs={8} sm={9}>
										<Grid container direction="column" align="center">
											<Grid item>
												<Typography variant="inherit">Waiting:</Typography>
											</Grid>
											<Grid item>
												<Typography variant="h3" style={{ color: "#ff6f61" }}>
													{props.requests.filter(x => x.status === null).length}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={4}>
							<Paper elevation={3} className={classes.paperStyle}>
								<Grid
									container
									alignItems="center"
									align="center"
									style={{ background: "#d9d9f4" }}
								>
									<Grid item xs={4} sm={3} style={{ background: "#aaaafa" }}>
										<img src={question} className={classes.help} alt="help" />
									</Grid>
									<Grid item xs={8} sm={9}>
										<Grid container direction="column" align="center">
											<Grid item>
												<Typography variant="inherit">In Queue:</Typography>
											</Grid>
											<Grid item>
												<Typography variant="h3" style={{ color: "#ff6f61" }}>
													{
														props.requests.filter(x => x.status === false)
															.length
													}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={4}>
							<Paper elevation={3} className={classes.paperStyle}>
								<Grid
									container
									alignItems="center"
									align="center"
									style={{ background: "#d9d9f4" }}
								>
									<Grid
										item
										xs={4}
										sm={3}
										style={{ background: "#aaaafa", margin: "0 auto" }}
									>
										<img src={question} className={classes.help} alt="help" />
									</Grid>
									<Grid item xs={8} sm={9}>
										<Grid container direction="column" align="center">
											<Grid item>
												<Typography variant="inherit">Done:</Typography>
											</Grid>
											<Grid item>
												<Typography variant="h3" style={{ color: "#ff6f61" }}>
													{props.requests.filter(x => x.status === true).length}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Chatbox data={props} />
			</Grid>
		</Grid>
	);
}

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
	mentorsAvatar: {
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3)
		}
	},
	studentsAvatar: {
		marginRight: "10px"
	},
	paperStyle: {
		width: "100%",
		height: "auto",
		// background:
		//   "linear-gradient(90deg, rgba(171,171,250,1) 0%, rgba(171,171,250,1) 30%, rgb(224, 225, 245) 30%)",
		opacity: "0.5",
		"&:hover": {
			opacity: "1"
		}
	},
	help: { margin: "10px", width: "70px" }
}));
