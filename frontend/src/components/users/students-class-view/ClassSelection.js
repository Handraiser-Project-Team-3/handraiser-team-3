import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// component/s
import { JoinClassModal } from "./JoinClassModal";
import Layout from "../reusables/Layout";
import ClassHead from "../reusables/ClassHead";

// images
import head from "../../assets/images/bg.jpg";
import classroom from "../../assets/images/classroom.jpg";
import man from "../../assets/images/man.png";

export const Classroom = props => {
  const { user, headers } = props.data;
  const userDetails = user ? user : {};
  const { first_name, id } = userDetails;
  const classes = useStyles();
  const [classList, setClassList] = React.useState([]);

  useEffect(() => {
    axios
      .get(`/api/class/`, headers)
      .then(res => {
        setClassList(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <Layout first_name={first_name}>
        <ClassHead />
        <Grid container direction="row" alignItems="center" spacing={3}>
          {classList.map(data => (
            <Grid key={data.id} item lg={3} md={4} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={classroom}
                    title="Contemplative Reptile"
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {data.class_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.class_description}
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
                    <JoinClassModal
                      classId={data.id}
                      className={data.class_name}
                      codeClass={data.class_code}
                    />
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Layout>
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
