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
        setAccessToken(res.data);
        alertToast("Log in Successful!");
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
        <Grid item className={classes.bg}>
          <Grid item className={classes.logo}>
            <div>
              <img src={Logo} alt="logo" className={classes.hand} />
            </div>
          </Grid>
          <div className={classes.container}>
            <div className={classes.signInContainer}>
              <Grid item xs={12} sm={12} md={8} lg={6}>
                <div>
                  <Typography className={classes.signin}>
                    Hand Raiser
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <Typography className={classes.subtitle}>
                    You can access the course material by logging in with your
                    @boom.camp account
                  </Typography>
                </div>
              </Grid>
              <Grid item>
                <GoogleLogin
                  clientId="98171074423-7khn6bi88f89ncbg6ev5ps5f962kdmlo.apps.googleusercontent.com"
                  buttonText="Login"
                  render={renderProps => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <Img src={googleIcon} />
                      <span style={{ margin: "3px 0 0 0" }}>
                        Sign-in using Google
                      </span>
                    </Button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className={classes.bar}>
                  <hr className={classes.hr} />
                </div>
              </Grid>
            </div>
            <div className={classes.teach}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <img src={Teacher} alt="teacher" className={classes.lady} />
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const alertToast = msg =>
  toast.info(msg, {
    position: "top-right",
    hideProgressBar: true,
    autoClose: 2000,
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
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%"
  },
  logo: {
    position: "absolute",
    top: "-70px",
    left: "50px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingLeft: 160
  },
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingTop: "200px",
    height: "60%",
    width: "100%",
    marginTop: 65
  },
  hand: {
    width: "200px"
  },
  signin: {
    fontSize: "80px",
    lineHeight: "112px",
    color: "#4ABDAC",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
  },
  subtitle: {
    fontSize: "20px",
    color: "#ABABAB"
  },
  google: {
    background: "#f7b733",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  img: {
    width: 70,
    height: 50
  },
  pGoogle: {
    fontSize: "25px",
    color: "#7C7C7C"
  },
  hr: {
    height: "0px",
    border: "8px solid #4ABDAC",
    transform: "rotate(-0.17deg)"
  },
  teach: {
    display: "flex",
    alignItems: "flex-end",
    height: "40%"
  },
  lady: {
    maxWidth: "100%",
    height: "auto"
  }
}));
const Button = styled.button`
  display: flex;
  align-content: center;
  border: none;
  border-radius: 30px;
  padding: 10px 40px 10px 40px;
  font-size: 22px;
  background: #454b69;
  color: white;
`;
const Img = styled.img`
  width: 30px;
  margin: 0 10px 0 0;
`;
