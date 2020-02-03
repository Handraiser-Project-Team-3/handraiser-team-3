import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import student from "../../assets/images/student.png";
import teacher from "../../assets/images/mentor2.png";
import both from "../../assets/images/output.png";

const useStyles = makeStyles({
	total: {
		width: "100%",
		height: "20vh",
		marginBottom: "2vh",
		background:
			"linear-gradient(207deg, rgba(74,189,172,1) 0%, rgba(74,189,172,1) 63%, rgba(255,255,255,1) 63%)"
	},
	imgStyle: {
		width: "70%",
		marginTop: "3vh"
	},
	ipadView: {
		"@media (width: 768)": {
			width: "50%"
		}
	}
});

export const PaperStat = props => {
	const classes = useStyles();

	return (
		<>
			<Paper className={classes.total}>
				<Grid container justify="center" align="center">
					<Grid item xs={6} className={classes.ipadView}>
						<img src={both} className={classes.imgStyle} />
					</Grid>
					<Grid item xs={6}>
						<Grid container direction="column" justify="center">
							<Grid item xs={12}>
								<Typography
									variant="h6"
									style={{ marginTop: "5vh", color: "white" }}
								>
									All
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="h3"
									style={{ fontWeight: "bold", color: "#fadc60" }}
								>
									20
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<Paper className={classes.total}>
				<Grid container justify="center" align="center">
					<Grid item xs={6}>
						<img src={teacher} className={classes.imgStyle} />
					</Grid>
					<Grid item xs={6}>
						<Grid container direction="column" justify="center">
							<Grid item xs={12}>
								<Typography
									variant="h6"
									style={{ marginTop: "5vh", color: "white" }}
								>
									Mentors
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="h3"
									style={{ fontWeight: "bold", color: "#fadc60" }}
								>
									5
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<Paper className={classes.total}>
				<Grid container justify="center" align="center">
					<Grid item xs={6}>
						<img src={student} className={classes.imgStyle} />
					</Grid>
					<Grid item xs={6}>
						<Grid container direction="column" justify="center">
							<Grid item xs={12}>
								<Typography
									variant="h6"
									style={{ marginTop: "5vh", color: "white" }}
								>
									Students
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="h3"
									style={{ fontWeight: "bold", color: "#fadc60" }}
								>
									15
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};
