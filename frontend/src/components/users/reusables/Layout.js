import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import "react-confirm-alert/src/react-confirm-alert.css";

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
  const { first_name, accountType } = props;

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
							Welcome {accountType ? accountType : ""}
							{first_name ? " " + first_name : ""}!
						</Typography>
					</Grid>
					<Grid item sm={3} md={2} lg={2}>
						<Breadcrumbs
							separator="›"
							aria-label="breadcrumb"
							className={classes.res}
						>
							<Typography color="inherit">{first_name}</Typography>
							<Typography color="textPrimary">Classrooms</Typography>
						</Breadcrumbs>
					</Grid>
				</Grid>
			</Paper>
			<div className={classes.container}>{props.children}</div>
		</div>
	);
}
