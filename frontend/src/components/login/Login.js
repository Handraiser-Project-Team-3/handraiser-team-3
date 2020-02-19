import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// images
import Background from "../assets/images/bg.jpg";
import Teacher from "../assets/images/teamwork.svg";
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
      <div className={classes.bg}>
        <img src={Logo} alt="logo" className={classes.handRaiserLogo} />
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          <Grid item md={6} lg={12} xl={12}>
            <Grid
              container
              direction="column"
              style={{ marginTop: "130px", zIndex: 1000 }}
            >
              <Grid item>
                <Typography
                  variant="h1"
                  style={{ color: "#ababfa", textShadow: "3px 2px #d0cde1" }}
                >
                  Welcome
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  style={{ width: "40%", color: "gray" }}
                >
                  You can access the classes by logging in with your @boom.camp
                  account
                </Typography>
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
                        background: "#ababfa",
                        color: "white",
                        outline: "none"
                      }}
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
            </Grid>
          </Grid>
          <Grid item md={6} lg={12} xl={12}>
            <img src={Teacher} alt="teacher" className={classes.svg} />
          </Grid>
        </Grid>
      </div>
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
  root: {
    height: "100vh",
    flexGrow: 1
  },
  bg: {
    // background:
    // 	"linear-gradient(207deg, rgba(171,171,250,1) 35%, rgba(255,255,255,1) 35%)",
    backgroundImage: `url(${Background})`,
    height: "100vh",
    backgroundSize: "100%",
    padding: "50px 500px 80px 80px"
  },
  handRaiserLogo: {
    width: "180px"
  },
  svg: {
    width: "1500px",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    margin: "0 auto"
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
