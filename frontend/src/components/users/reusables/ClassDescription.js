import React from "react";
// Material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// component/s
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import { ClassroomStyle } from "../style/Styles";
import work from "../../assets/images/prog.svg";
import { Paper } from "@material-ui/core";

export default function ClassDescription({ classDetails }) {
  const classes = ClassroomStyle();

  return (
    <Paper elevation={5}>
      <Grid
        className={classes.banner}
        container
        alignItems="center"
        justify="center"
        align="center"
      >
        <Grid item xs={12} sm={6}>
          <img src={work} style={{ width: "270px" }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" style={{ color: "white" }}>
            {!!classDetails ? classDetails.class_name : ""}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
