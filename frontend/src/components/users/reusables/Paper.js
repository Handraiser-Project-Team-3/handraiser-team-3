import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import stud from "../../assets/images/student.png";
import teacher from "../../assets/images/mentor2.png";
import both from "../../assets/images/output.png";
import axios from "axios";

const useStyles = makeStyles({
	total: {
		width: "100%",
		height: "auto",
		marginBottom: "2vh",
		background:
			"linear-gradient(207deg, rgba(171,171,250,1) 0%, rgba(171,171,250,1) 63%, rgba(255,255,255,1) 63%)"
	},
	imgStyle: {
		width: "80%",
		height: "auto",
		margin: "2.4vh 0 2.4vh 0",
		borderRadius: "50%",
		background: "#aaaafa",
		padding: "10px",
		cursor: "pointer",
		border: "solid 10px white",
		transition: "border-width 0.3s linear",
		"&:hover": {
			borderWidth: "10px"
		}
	},
	label: {
		marginTop: "1vh",
		color: "white",
		"@media (max-width: 1024px)": {
			color: "#565cce"
		}
	}
});

export const PaperStat = props => {
	const classes = useStyles();
	const { headers, users, setUsers } = props;
	const [all, setAll] = React.useState(true);
	const [mentor, setMentor] = React.useState(true);
	const [student, setStudent] = React.useState(true);

	useEffect(() => {
		headers &&
			axios.get("/api/user/list", headers).then(res => {
				setUsers(res.data);
			});
	}, [headers]);

	return (
		<>
			<Paper elevation={5} className={classes.total}>
				<Grid container justify="center" align="center" alignItems="center">
					{all ? (
						<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
							<img
								src={both}
								className={classes.imgStyle}
								alt="all"
								onClick={() => {
									setAll(false);
								}}
							/>
						</Grid>
					) : (
						<>
							<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
								<img
									src={both}
									className={classes.imgStyle}
									alt="all"
									onClick={() => {
										setAll(true);
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
								<Grid container direction="column" justify="center">
									<Grid item xs={12}>
										<Typography variant="h6" className={classes.label}>
											Mentors
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											variant="h3"
											style={{ fontWeight: "bold", color: "#fadc60" }}
										>
											{users.filter(user => user.account_type_id !== 1).length}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</Paper>
			<Paper elevation={5} className={classes.total}>
				<Grid container justify="center" align="center" alignItems="center">
					{mentor ? (
						<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
							<img
								src={teacher}
								className={classes.imgStyle}
								alt="all"
								onClick={() => {
									setMentor(false);
								}}
							/>
						</Grid>
					) : (
						<>
							<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
								<img
									src={teacher}
									className={classes.imgStyle}
									alt="mentor"
									onClick={() => {
										setMentor(true);
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
								<Grid container direction="column" justify="center">
									<Grid item xs={12}>
										<Typography variant="h6" className={classes.label}>
											All
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											variant="h3"
											style={{ fontWeight: "bold", color: "#fadc60" }}
										>
											{users.filter(user => user.account_type_id === 2).length}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</Paper>
			<Paper elevation={5} className={classes.total}>
				<Grid container justify="center" align="center" alignItems="center">
					{student ? (
						<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
							<img
								src={stud}
								className={classes.imgStyle}
								alt="student"
								onClick={() => {
									setStudent(false);
								}}
							/>
						</Grid>
					) : (
						<>
							<Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
								<img
									src={stud}
									className={classes.imgStyle}
									alt="student"
									onClick={() => {
										setStudent(true);
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
								<Grid container direction="column" justify="center">
									<Grid item xs={12}>
										<Typography variant="h6" className={classes.label}>
											Students
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											variant="h3"
											style={{ fontWeight: "bold", color: "#fadc60" }}
										>
											{users.filter(user => user.account_type_id === 3).length}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</Paper>
		</>
	);
};
