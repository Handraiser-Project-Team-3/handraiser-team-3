import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// images
import Background from "../assets/images/bg.jpg";
import Teacher from "../assets/images/undraw.svg";
import Logo from "../assets/images/logo.png";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import googleIcon from "../assets/images/google.svg";

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
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.root}
			>
				<Grid container>
					<Grid item xs={12}>
						<div className={classes.bg}>
							<Grid container className={classes.handRaiser}>
								<Grid item xs={12}>
									<img src={Logo} alt="logo" className={classes.hand} />
								</Grid>
								<Grid container direction="row" className={classes.handRaiser}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<Typography className={classes.signin}>
											HandRaiser
										</Typography>
									</Grid>
									<Grid item xs={12} sm={9} md={8} lg={5}>
										<Typography className={classes.subtitle}>
											You can access the classes by logging in with your
											@boom.camp account
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<GoogleLogin
											clientId="98171074423-7khn6bi88f89ncbg6ev5ps5f962kdmlo.apps.googleusercontent.com"
											buttonText="Login"
											render={renderProps => (
												<Button
													onClick={renderProps.onClick}
													disabled={renderProps.disabled}
												>
													<Img src={googleIcon} />
													<span className={classes.googleSignin}>
														Sign-in with Google
													</span>
												</Button>
											)}
											onSuccess={responseGoogle}
											onFailure={responseGoogle}
											cookiePolicy={"single_host_origin"}
										/>
									</Grid>
									<Grid item xs={12} sm={9} md={7} lg={5}>
										<hr className={classes.hr} />
									</Grid>
								</Grid>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<img src={Teacher} alt="teacher" className={classes.lady} />
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

const alertToast = msg =>
	toast.info(msg, {
		position: "top-right",
		hideProgressBar: true,
		autoClose: 6000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	});

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		flexGrow: 1
	},
	bg: {
		backgroundImage: `url(${Background})`,
		height: "100vh",
		backgroundSize: "cover"
	},
	handRaiser: {
		padding: "0vh 5vw 1vh 5vw"
	},
	hand: {
		"@media (max-width: 415px)": {
			width: "50%"
		}
	},
	signin: {
		fontSize: "70px",
		marginTop: "80px",
		color: "#4ABDAC",
		textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		"@media (max-width: 1024px)": {
			marginTop: "100px",
			fontSize: "90px"
		},
		"@media (max-width: 415px)": {
			marginTop: "50px",
			fontSize: "40px"
		}
	},
	subtitle: {
		fontSize: "20px",
		color: "#ABABAB",
		"@media (max-width: 1024px)": {
			fontSize: "25px"
		},
		"@media (max-width: 415px)": {
			fontSize: "16px"
		}
	},
	hr: {
		height: "0px",
		border: "4px solid #4ABDAC",
		marginTop: "35px"
	},
	googleSignin: {
		margin: "3px 0 0 0",
		"@media (max-width: 415px)": {
			fontSize: "14px"
		}
	},
	lady: {
		width: "45vw",
		"@media (max-width: 360px)": {
			width: "20rem",
			marginTop: "70px"
		},
		"@media (width: 320px)": {
			width: "18rem",
			marginTop: "10px"
		},
		"@media (width: 375px), (height: 667px)": {
			width: "21rem",
			marginTop: "80px"
		},
		"@media (width: 411px), (height: 731px)": {
			width: "23rem",
			marginTop: "130px"
		},
		"@media (height: 823px)": {
			width: "23rem",
			marginTop: "200px"
		},
		"@media (width: 414px)": {
			width: "23rem",
			marginTop: "15vh"
		},
		"@media (width: 411px)": {
			marginTop: "15vh"
		},
		"@media (width: 768px)": {
			width: "40rem",
			marginTop: "10vh"
		},
		"@media (width: 1024px)": {
			width: "50rem",
			marginTop: "25vh"
		}
	}
}));

const Button = styled.button`
	display: flex;
	align-items: center;
	border: none;
	border-radius: 30px;
	padding: 10px 40px 10px 40px;
	font-size: 20px;
	background: #ffdf78d9;
	color: gray;
	margin-top: 50px;
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