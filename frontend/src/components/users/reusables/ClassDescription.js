import React from "react";

// Material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// component/s
import "react-confirm-alert/src/react-confirm-alert.css";

// images
import { ClassroomStyle } from "../style/Styles";
import work from "../../assets/images/prog.svg";
import { Paper, isWidthDown, Tooltip } from "@material-ui/core";
import ReactCardFlip from "react-card-flip";

export default function ClassDescription({ classDetails }) {
	const classes = ClassroomStyle();
	const [isFlipped, setIsFlipped] = React.useState(false);

	const handleFlip = () => {
		setIsFlipped(true);
	};

	return (
		<ReactCardFlip
			isFlipped={isFlipped}
			flipDirection="horizontal"
			infinite="true"
			flipSpeedFrontToBack={1}
			flipSpeedBackToFront={1}
		>
			<Paper elevation={5}>
				<Grid
					className={classes.banner}
					container
					alignItems="center"
					justify="center"
					align="center"
				>
					<Grid item xs={12} sm={6}>
						<img src={work} style={{ width: "270.5px" }} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Tooltip title="Click to see Description">
							<Typography
								variant="h4"
								style={{ color: "white", cursor: "pointer" }}
								onClick={() => handleFlip()}
							>
								{!!classDetails ? classDetails.class_name : ""}
							</Typography>
						</Tooltip>
					</Grid>
				</Grid>
			</Paper>
			<Paper elevation={5}>
				<Grid
					className={classes.banner}
					style={{ height: "177px", padding: "30px" }}
					container
					alignItems="center"
					justify="flex-start"
				>
					<Grid item>
						<Typography
							variant="h6"
							style={{ color: "#d1d1f3", textShadow: "1px 0px white" }}
						>
							{!!classDetails ? classDetails.class_name : ""} Description:
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Tooltip title="Click to see Class Title">
							<Typography
								variant="subtitle2"
								style={{ color: "white", fontSize: "16px", cursor: "pointer" }}
								onClick={() => setIsFlipped(false)}
							>
								{!!classDetails ? classDetails.class_description : ""}
							</Typography>
						</Tooltip>
					</Grid>
				</Grid>
			</Paper>
		</ReactCardFlip>
	);
}
