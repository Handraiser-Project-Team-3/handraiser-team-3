import React from "react";

// Material-ui
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// component/s
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import { ClassroomStyle } from "../style/Styles";
import work from "../../assets/images/teamwork.svg";
import { Paper } from "@material-ui/core";

const ExpansionPanel = withStyles({
	root: {
		// border: "1px solid rgba(0, 0, 0, .125)",
		boxShadow: "none",
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		},
		"&$expanded": {
			margin: "auto"
		}
	},
	expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
	root: {
		backgroundColor: "rgba(0, 0, 0, .03)",
		borderBottom: "1px solid rgba(0, 0, 0, .125)",
		marginBottom: -1,
		minHeight: 56
	},
	content: {
		"&$expanded": {
			margin: "12px 0"
		}
	},
	expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		overflow: "auto",
		height: "90px"
	}
}))(MuiExpansionPanelDetails);

export default function ClassDescription(props) {
	const classes = ClassroomStyle();
	const { setReqBox } = props;

	return (
		<Paper elevation={5}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					className={classes.banner}
					onClick={() => setReqBox(true)}
				>
					<Grid container alignItems="center" justify="center" align="center">
						<Grid item xs={12} sm={6}>
							<img src={work} style={{ width: "270px" }} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="h4" style={{ color: "white" }}>
								Class Name
							</Typography>
						</Grid>
					</Grid>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Paper>
	);
}
