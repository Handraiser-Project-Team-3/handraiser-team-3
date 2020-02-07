import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// images
import Background from "../../assets/images/bg.jpg";
import NotFound from "../../assets/images/404.svg";

// material-ui
import { makeStyles } from "@material-ui/core/styles";

export default function PageNotFound(props) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<div className={classes.bg}>
				<div style={{ width: "100%", paddingTop: "8%" }}>
					<Grid
						container
						direction="column"
						justify="center"
						align="center"
						alignItems="center"
					>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
							<img src={NotFound} className={classes.imgStyle} alt='Not Found' />
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<Typography variant="h4" style={{ color: "#717171" }}>
								We can't seem to find the page you're looking for.
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Link
								to="/"
								color="inherit"
								style={{ textDecoration: "none" }}
							>
								<Button
									variant="outlined"
									color="primary"
									style={{ marginTop: "30px" }}
								>
									Go Back
							</Button>
							</Link>
						</Grid>
					</Grid>
				</div>
			</div>
		</React.Fragment>
	);
}

const useStyles = makeStyles(theme => ({
	bg: {
		backgroundImage: `url(${Background})`,
		height: "100vh",
		backgroundSize: "cover",
		margin: "0 auto"
	},
	imgStyle: {
		width: "90%",
		marginBottom: "5%"
	}
}));
