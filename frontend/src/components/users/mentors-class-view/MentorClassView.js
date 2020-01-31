import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

// component/s
import { Modal } from "./Modal";
import ClassHead from "../reusables/ClassHead";
import Layout from "../reusables/Layout";

// images
import head from "../../assets/images/bg.jpg";
import classroom from "../../assets/images/classroom.jpg";
import student from "../../assets/images/student.png";
import edit from "../../assets/images/edit.png";

export const MentorClassView = props => {
  const classes = useStyles();
  const { user, accessToken, headers } = props.data;
  const userDetails = user ? user : {};
  const { first_name, account_type_id } = userDetails;
  const [headTitle, setHeadTitle] = useState("");
  const [accountType] = useState("Mentor");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [classList, setClassList] = useState([]);
  const history = useHistory();
  const [classRoom, setClassRoom] = useState({
    class_name: "",
    class_description: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
    setAction("Save");
    setHeadTitle("Edit");
  };

  useEffect(() => {
    axios
      .get("/api/class", headers)
      .then(res => {
        setClassList(
          res.data.filter(id => {
            if (id.user_id === user.id) {
              return id;
            }
            return null;
          })
        );
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Layout accountType={accountType} first_name={first_name}>
        <ClassHead
          account_type_id={account_type_id}
          setOpen={setOpen}
          setAction={setAction}
          setHeadTitle={setHeadTitle}
        />
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
                          <img
                            src={student}
                            alt="man"
                            style={{ width: "30px" }}
                          />
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
                                Students:
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <b>10</b>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ background: "#d0efea" }}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item lg={10} md={10} sm={9} xs={9}>
                      <Button size="small" style={{ color: "#b5855a" }}>
                        Enter Class
                      </Button>
                    </Grid>
                    <Grid item lg={1}>
                      <Grid container direction="row" alignItems="center">
                        <Tooltip title="Edit Class">
                          <img
                            src={edit}
                            alt="edit"
                            className={classes.icons}
                            style={{ marginRight: "10px" }}
                            onClick={() => {
                              handleClickOpen();
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={open}
          setOpen={setOpen}
          action={action}
          headTitle={headTitle}
          setClassRoom={setClassRoom}
          classRoom={classRoom}
          headers={headers}
          userId={user.id}
          setClassList={setClassList}
          classList={classList}
        />
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
  },
  addClass: {
    cursor: "pointer",
    color: "#8e9493"
  },
  icons: {
    width: "20px",
    cursor: "pointer",
    "&:hover": {
      width: "23px",
      borderRadius: "10%"
    }
  }
}));
