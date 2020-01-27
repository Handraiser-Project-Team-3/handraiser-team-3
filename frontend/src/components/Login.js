import React from 'react';

import Background from './img/bg.jpg';
import Teacher from './img/undraw.svg';
import Logo from './img/logo.png';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

function Login(props) {
    const classes = useStyles();
    const { width } = props;

    return (
        <React.Fragment>
            <Grid className={classes.root}>
                <div className={classes.bg}>
                    <Grid item className={classes.logo}>
                        <img src={Logo} alt="teacher" />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.signinContainer}>
                            <Typography className={classes.signin}>Hand Raiser</Typography>
                            <div className={classes.subtitleContainer}>
                                <Typography variant="subtitle1" className={classes.subtitle}>You can access the site by logging in with
                                your google account</Typography>
                            </div>
                            <div>
                                <button className={classes.google}>
                                    <div>
                                        <img src={require('./img/google_icon.png')} className={classes.img} />
                                    </div>
                                    <div>
                                        <Typography className={classes.pGoogle}>Sign in with Google</Typography>
                                    </div>
                                </button>
                            </div>
                            <Grid item xs={12} sm={12} md={4}>
                                <hr className={classes.hr} />
                            </Grid>
                            <Hidden smDown>
                                <div className={classes.teacher}>
                                    <img src={Teacher} alt="teacher" className={classes.lady} />
                                </div>
                            </Hidden>
                        </div>
                    </Grid>
                </div>
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
        display: 'flex',
        height: '100vh'
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
    signinContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '160px'
    },
    signin: {
        position: 'absolute',
        height: '100px',
        top: '150px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '96px',
        lineHeight: '112px',
        color: '#4ABDAC',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    subtitle: {
        position: 'absolute',
        top: '300px',
        fontSize: '20px',
        color: '#ABABAB'
    },
    img: {
        width: 95,
        height: 75
    },
    google: {
        position: 'absolute',
        width: '398px',
        height: '80px',
        left: '160px',
        top: '340px',
        background: 'rgba(247, 183, 51, 0.38)',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center'
    },
    pGoogle: {
        left: '95px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '32px',
        lineHeight: '37px',
        color: '#7C7C7C'
    },
    hr: {
        position: 'absolute',
        width: '687px',
        height: '0px',
        left: '152px',
        top: '450px',
        border: '8px solid #4ABDAC',
        transform: 'rotate(-0.17deg)'
    },
    teacher: {
        position: 'absolute',
        left: '0%',
        right: '0%',
        top: '585px',
        bottom: '-0.01%',
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
        marginLeft: '160px',
        width: 500,
        height: 360,
    }
}));