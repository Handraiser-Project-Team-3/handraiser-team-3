import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";

// component/s
import { JoinClassModal } from "./JoinClassModal";
import Layout from "../reusables/Layout";
import ClassHead from "../reusables/ClassHead";

// images
import head from "../../assets/images/bg.jpg";
import classroom from "../../assets/images/classroom.jpg";
import man from "../../assets/images/man.png";

export const Classroom = props => {
	const { user, headers } = props.data;
	const userDetails = user ? user : {};
	const { first_name, account_type_id } = userDetails;
	const classes = useStyles();
	const [classList, setClassList] = React.useState([]);
	const [filter, setFilter] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/class/`, headers)
			.then(res => {
				setClassList(res.data);
				setFilter(res.data);
			})
			.catch(e => console.log(e));
	}, []);

	return (
		<>
			<Layout first_name={first_name}>
				<ClassHead
					account_type_id={account_type_id}
					filter={filter}
					setClassList={setClassList}
				/>
				<Grid container direction="row" alignItems="center" spacing={3}>
					{classList.length !== 0 ? (
						classList
							.sort((a, b) => (a.id > b.id ? 1 : -1))
							.map((data, i) => (
								<Grid key={i} item lg={3} md={4} sm={6} xs={12}>
									<Card className={classes.card}>
										<CardActionArea>
											<CardMedia
												className={classes.media}
												image={classroom}
												title="Contemplative Reptile"
											></CardMedia>
											<CardContent>
												<Typography gutterBottom variant="h5">
													{data.class_name}
												</Typography>
												<Tooltip
													title={
														data.class_description.length > 48
															? data.class_description.substring(0)
															: ""
													}
												>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p"
													>
														{data.class_description.length > 48
															? data.class_description.substring(0, 40) + "..."
															: data.class_description}
													</Typography>
												</Tooltip>
											</CardContent>
											<CardContent>
												<Typography
													gutterBottom
													component="div"
													variant="inherit"
												>
													<Grid
														container
														direction="row"
														alignItems="center"
														justify="space-between"
													>
														<Grid item lg={2} xs={2}>
															<img
																src={man}
																alt="man"
																style={{ width: "30px" }}
															/>
														</Grid>

														<Grid item lg={10} xs={10}>
															<Grid
																container
																direction="column"
																alignItems="flex-start"
																justify="space-between"
															>
																<Grid item lg={12} xs={12}>
																	<Typography
																		gutterBottom
																		component="div"
																		variant="caption"
																	>
																		Mentor's Name:
																	</Typography>
																</Grid>
																<Grid item lg={12} xs={12}>
																	<b>{}</b>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions style={{ background: "#ff6f61ff" }}>
											<Grid container direction="column" alignItems="center">
												<JoinClassModal
													classId={data.id}
													className={data.class_name}
													codeClass={data.class_code}
													user={user}
													headers={headers}
												/>
											</Grid>
										</CardActions>
									</Card>
								</Grid>
							))
					) : (
						<div className={classes.margin}>
							<span className={classes.noClasses}>No added classes yet</span>
							<div className="spinner">
								<div className="bounce1"></div>
								<div className="bounce2"></div>
								<div className="bounce3"></div>
							</div>
						</div>
					)}
				</Grid>
			</Layout>
		</>
	);
};

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
	header: {
		height: "auto",
		backgroundImage: `url(${head})`,
		backgroundSize: "cover",
		padding: "20px",
		paddingTop: "85px"
	},
	color: {
		color: "gray",
		paddingLeft: "35px"
	},
	res: {
		"@media (max-width: 415px)": {
			display: "none"
		}
	},
	blackboard: {
		width: "35px",
		padding: "0"
	},
	container: {
		margin: "50px 8vw 10px 8vw"
	},
	classStyle: {
		color: "#f7b733",
		textDecoration: "underline",
		textDecorationColor: "lightgray",
		textUnderlinePosition: "under"
	},
	card: {
		maxWidth: 345
	},
	media: {
		height: 140,
		backgroundPositionY: "-45px"
	},
	noClasses: {
		fontSize: "30px",
		color: "gray"
	},
	margin: {
		margin: "0 auto",
		marginTop: "10%",
		display: "flex",
		alignItems: "baseline"
	}
}));
