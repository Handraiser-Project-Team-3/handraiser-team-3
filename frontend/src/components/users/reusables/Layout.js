import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
// images
import head from "../../assets/images/bg.jpg";

const useStyles = makeStyles(theme => ({
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
  container: {
    margin: "50px 8vw 10px 8vw"
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const { first_name, classId, typeId, headers } = props;
  const [roomName, setroomName] = React.useState([]);

  React.useEffect(() => {
    if (classId) {
      axios(`/api/class/${classId}`, headers).then(res => {
        setroomName(res.data);
      });
    }
  }, [headers, classId]);
  return (
    <div>
      <Paper elevation={0} className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={9} md={10} lg={10}>
            <Typography variant="h5" className={classes.color}>
              Welcome {first_name}!
            </Typography>
          </Grid>
          <Grid item sm={3} md={2} lg={2}>
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.res}
            >
              {classId ? (
                <Link to="/" color="inherit" style={{ textDecoration: "none" }}>
                  <Typography
                    style={{
                      color: "#3534B5",
                      fontWeight: "500",
                      fontSize: "1em"
                    }}
                  >
                    Home
                  </Typography>
                </Link>
              ) : (
                <Typography
                  style={{
                    color: "#3534B5",
                    fontWeight: "500",
                    fontSize: "1em"
                  }}
                >
                  {typeId ? "Admin" : "Home"}
                </Typography>
              )}
              {classId && (
                <Typography
                  style={{
                    color: "#3534B5",
                    fontWeight: "500",
                    fontSize: "1em"
                  }}
                >
                  {roomName.class_name}
                </Typography>
              )}
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.container}>{props.children}</div>
    </div>
  );
}
