import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@material-ui/core/Paper";

// images
import Background from "../assets/images/backg.png";
import Girl from "../assets/images/hehe.gif";
import Logo1 from "../assets/images/logo.png";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import googleIcon from "../assets/images/google.svg";
import { Hidden } from "@material-ui/core";

export const Login = props => {
	const { setAccessToken } = props.data;
	const classes = useStyles();

	const responseGoogle = res => {
		const obj = {
			first_name: res.profileObj.givenName,
			last_name: res.profileObj.familyName,
			email: res.profileObj.email,
			user_image: res.profileObj.imageUrl
		};
		axios
			.post("/api/login", obj)
			.then(res => {
				alertToast("Log in Successful!");
				setAccessToken(res.data);
			})
			.catch(() => {
				alertToast("Unable to Login!");
			});
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<ToastContainer enableMulticontainer />

			<Grid container align="center">
				<Grid item xs={12} sm={7}>
					<div className={classes.bg}></div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Grid
						container
						direction="row"
						alignItems="center"
						className={classes.thirdCont}
					>
						<Grid item xs={12}>
							<Grid container justify="center" spacing={8}>
								<Grid item>
									<img src={Logo1} style={{ width: "90%" }} />
								</Grid>
								<Grid item>
									<Grid container justify="center" spacing={3}>
										<Grid item>
											<Typography
												variant="h1"
												style={{
													color: "purple",
													textShadow: "3px 2px black"
												}}
											>
												Welcome!
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="h5" style={{ color: "gray" }}>
												You can access the classes by logging in with your{" "}
												<span style={{ color: "purple", paddingRight: "5px" }}>
													{" "}
													@boom.camp
												</span>
												account
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<GoogleLogin
										clientId="98171074423-7khn6bi88f89ncbg6ev5ps5f962kdmlo.apps.googleusercontent.com"
										buttonText="Login"
										render={renderProps => (
											<Button
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
												style={{
													background: "#692896",
													color: "white",
													outline: "none"
												}}
											>
												<Img src={googleIcon} />
												<span>Sign-in with Google</span>
											</Button>
										)}
										onSuccess={responseGoogle}
										onFailure={responseGoogle}
										cookiePolicy={"single_host_origin"}
									/>
								</Grid>
								{/* <img src={Girl} /> */}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Hidden mdDown>
					<Grid item xs={12} sm={1}>
						<Grid
							container
							justify="center"
							direction="column"
							spacing={3}
							className={classes.titleGrid}
						>
							{/* <img src={Logo} style={{ width: "100px" }} /> */}
						</Grid>
					</Grid>
				</Hidden>
			</Grid>
		</React.Fragment>
	);
};

const alertToast = msg =>
	toast.info(msg, {
		position: "top-right",
		autoClose: 6000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});

const useStyles = makeStyles(theme => ({
	bg: {
		backgroundImage: `url(${Background})`,
		height: "100vh",
		backgroundSize: "cover",
		opacity: "0.6",
		"&:hover": {
			opacity: "1"
		}
	},
	handRaiserLogo: {
		width: "180px"
	},
	svg: {
		width: "100%",
		position: "absolute",
		bottom: "0px",
		margin: "0 auto"
	},
	title: {
		// color: `url(${SideBackground})`,
		writingMode: "vertical-lr",
		textOrientation: "upright",
		fontSize: "40px"
	},
	titleGrid: {
		// background: `url(${SideBackground})`,
		background: "#ababfa",
		height: "101.2vh",
		width: "100%",
		fontWeight: "bold"
	},
	thirdCont: {
		background: "#ffffff",
		height: "100vh",
		width: "100%"
	}
}));

const Button = styled.button`
	display: flex;
	align-items: center;
	border: none;
	border-radius: 30px;
	padding: 10px 40px 10px 40px;
	font-size: 20px;
	background: #ababfa;
	color: gray;
	margin-top: 30px;
	margin-bottom: 100px;
	outline: none;
	@media (max-width: 768px) {
		font-size: 20px;
	}
`;
const Img = styled.img`
	width: 25px;
	margin: 0 10px 0 0;
	@media (max-width: 415px) {
		width: 15px;
	}
`;
