import React from "react";
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
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// component/s
import { Modal } from "./Modal";

// images
import head from "../../assets/images/bg.jpg";
import blackboard from "../../assets/images/blackboard.png";
import classroom from "../../assets/images/classroom.jpg";
import student from "../../assets/images/student.png";
import trash from "../../assets/images/edit-tools.png";
import edit from "../../assets/images/edit.png";

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

export const MentorClassView = props => {
  const { user, setUser, setAccessToken } = props.data;
  const userDetails = user ? user : {};
  const { account_type_id, first_name } = userDetails;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setName("Edit");
  };

  const handleClickOpenAdd = () => {
    setOpen(true);
    setName("Add");
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this Class?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };

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
              Welcome Mentor {first_name}!
            </Typography>
          </Grid>
          <Grid item sm={3} md={2} lg={2}>
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.res}
            >
              <Link color="inherit">{first_name} </Link>
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
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              spacing={1}
              style={{ marginBottom: "1vh" }}
            >
              <Grid item>
                <Typography variant="h6" className={classes.classStyle}>
                  CLASSROOMS
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Add Class">
                  <AddCircleOutlineIcon
                    fontSize="small"
                    className={classes.addClass}
                    onClick={() => {
                      handleClickOpenAdd();
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" spacing={3}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={classroom}
                  title="Contemplative Reptile"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    BoomCamp Frontend
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species.
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
                  <Grid item lg={2} md={2} sm={3} xs={3}>
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
                      <Grid item>
                        <Tooltip title="Delete Class">
                          <img
                            src={trash}
                            alt="delete"
                            className={classes.icons}
                            onClick={() => {
                              handleDelete();
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Modal open={open} setOpen={setOpen} name={name} />
      </div>
    </>
  );
};
