import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// images
import Girl from "../assets/images/hehe.gif";
import two from "../assets/images/teamwork.svg";
import Logo1 from "../assets/images/logo.png";

// material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import googleIcon from "../assets/images/google.svg";
import { Hidden } from "@material-ui/core";

import { LoginStyle } from "../users/style/Styles";

export const Login = props => {
  const { setAccessToken } = props.data;
  const classes = LoginStyle();

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

      <Grid container align="center">
        <Hidden mdDown>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <div className={classes.bg}></div>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Grid container alignItems="flex-start" className={classes.thirdCont}>
            <Grid item xs={12}>
              <Grid container direction="column" justify="center">
                <Grid item xs={12}>
                  <img src={Logo1} className={classes.logo} alt="" />
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item xs={12} sm={12} lg={12}>
                      <Typography variant="h1" className={classes.welcome}>
                        Welcome!
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                      <Typography variant="h5" className={classes.access}>
                        You can access the classes by logging in with your{" "}
                        <span style={{ color: "purple", paddingRight: "5px" }}>
                          {" "}
                          @boom.camp
                        </span>
                        account
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} lg={12} className={classes.google}>
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
                </Grid>
                <Hidden lgUp>
                  <Grid item xs={12}>
                    <img
                      src={two}
                      style={{
                        width: "100%",
                        marginTop: "8px"
                      }}
                      alt=""
                    />
                  </Grid>
                </Hidden>
                <Hidden mdDown>
                  <Grid item xs={12}>
                    <img src={Girl} className={classes.gif} alt="" />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} sm={12} md={12} lg={1}>
            <Grid
              container
              justify="center"
              direction="column"
              spacing={3}
              className={classes.titleGrid}
            ></Grid>
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
  @media (max-width: 1024px) {
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
