import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import student from "../../assets/images/student.png";
import teacher from "../../assets/images/mentor2.png";
import both from "../../assets/images/output.png";
import axios from "axios";

const useStyles = makeStyles({
  total: {
    width: "100%",
    height: "20vh",
    marginBottom: "2vh",
    background:
      "linear-gradient(207deg, rgba(171,171,250,1) 0%, rgba(171,171,250,1) 63%, rgba(255,255,255,1) 63%)"
  },
  imgStyle: {
    width: "70%",
    height: "auto",
    marginTop: "3vh"
  },
  label: {
    marginTop: "1vh",
    color: "white",
    "@media (max-width: 1024px)": {
      color: "#565cce"
    }
  }
});

export const PaperStat = props => {
  const classes = useStyles();
  const { headers, users, setUsers } = props;
  useEffect(() => {
    headers &&
      axios.get("/api/user/list", headers).then(res => {
        setUsers(res.data);
      });
  }, [headers]);

  return (
    <>
      <Paper className={classes.total}>
        <Grid container justify="center" align="center" alignItems="center">
          <Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
            <img src={both} className={classes.imgStyle} alt="all" />
          </Grid>
          <Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
            <Grid container direction="column" justify="center">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.label}>
                  All
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", color: "#fadc60" }}
                >
                  {users.filter(user => user.account_type_id !== 1).length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.total}>
        <Grid container justify="center" align="center" alignItems="center">
          <Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
            <img src={teacher} className={classes.imgStyle} alt="mentor" />
          </Grid>
          <Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
            <Grid container direction="column" justify="center">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.label}>
                  Mentors
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", color: "#fadc60" }}
                >
                  {users.filter(user => user.account_type_id === 2).length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.total}>
        <Grid container justify="center" align="center" alignItems="center">
          <Grid item xs={6} sm={4} md={7} lg={6} xl={6}>
            <img src={student} className={classes.imgStyle} alt="student" />
          </Grid>
          <Grid item xs={6} sm={8} md={12} lg={6} xl={6}>
            <Grid container direction="column" justify="center">
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.label}>
                  Students
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", color: "#fadc60" }}
                >
                  {users.filter(user => user.account_type_id === 3).length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
