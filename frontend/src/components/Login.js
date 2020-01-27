import React from 'react';

import Background from './img/bg.jpg';
import Teacher from './img/undraw.svg';
import Logo from './img/logo.png';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

function Login() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Grid item className={classes.bg}>
                    <Grid item className={classes.logo}>
                        <img src={Logo} alt="logo" className={classes.hand} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography className={classes.signin}>Hand Raiser</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.subtitleContainer}>
                        <Typography className={classes.subtitle}>You can access the site by logging in with
                                your google account</Typography>
                    </Grid>
                    <Grid item>
                        <button className={classes.google}>
                            <div>
                                <img src={require('./img/google_icon.png')} className={classes.img} alt='g_icon' />
                            </div>
                            <div>
                                <Typography className={classes.pGoogle}>Sign in</Typography>
                            </div>
                        </button>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs={12} sm={12} md={4}>
                            <hr className={classes.hr} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <img src={Teacher} alt="teacher" className={classes.lady} />
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}

Login.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Login);

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        flexGrow: 1
    },
    bg: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: '10% 10%',
        backgroundSize: "cover",
        height: "100%",
        width: "100%"
    },
    logo: {
        position: 'absolute',
        top: '-70px',
        left: '50px'
    },
    hand: {
        width: '200px'
    },
    signinContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        marginLeft: 160,
    },
    signin: {
        fontSize: '80px',
        lineHeight: '112px',
        color: '#4ABDAC',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    subtitleContainer: {
        display: 'flex',

    },
    subtitle: {
        fontSize: '20px',
        color: '#ABABAB'
    },
    google: {
        background: '#f7b733',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center'
    },

    img: {
        width: 70,
        height: 50
    },

    pGoogle: {
        fontSize: '25px',
        color: '#7C7C7C'
    },
    hr: {
        width: '687px',
        height: '0px',
        border: '8px solid #4ABDAC',
        transform: 'rotate(-0.17deg)'
    },
    Teach: {
        backgroundImage: `url(${Teacher})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        height: "100%",
        width: "100%",
        zIndex: 9
    },
    lady: {
        width: 500,
        height: 360,
    }
}));