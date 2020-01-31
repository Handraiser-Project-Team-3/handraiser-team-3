import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// component/s
import { JoinClassModal } from "./JoinClassModal";

// images
import head from "../../assets/images/bg.jpg";
import blackboard from "../../assets/images/blackboard.png";
import classroom from "../../assets/images/classroom.jpg";
import man from "../../assets/images/man.png";

export const Classroom = props => {
  const { user } = props.data;
  const userDetails = user ? user : {};
  const { first_name } = userDetails;
  const classes = useStyles();
  const [classList, setClassList] = React.useState([])

  useEffect(() => {
    let tempToken = localStorage.getItem('accessToken')
    let token = tempToken.substring(1, tempToken.length - 1);
    axios({
      method: 'get',
      url: `/api/class`,
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setClassList(res.data)
      })
      .catch()
  }, []);

  return (
    <>
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
              <Link color="inherit" style={{ textDecoration: "none" }}>
                {first_name}{" "}
              </Link>
              <Typography color="textPrimary">Classrooms</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.container}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={5}
          style={{ marginBottom: "1vh" }}
        >
          <Grid item>
            <img
              src={blackboard}
              alt="blackboard"
              className={classes.blackboard}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.classStyle}>
              CLASSROOMS
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          {classList.map(i => (
            <Grid key={i.id} item lg={4} md={6} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={classroom}
                    title="Contemplative Reptile"
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {i.class_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {i.class_description}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom component="div" variant="inherit">
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item lg={2} xs={2}>
                          <img src={man} alt="man" style={{ width: "30px" }} />
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
                <CardActions style={{ background: "#fbdfa1" }}>
                  <Grid container direction="column" alignItems="center">
                    <JoinClassModal />
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

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
    height: 140
  }
}));
