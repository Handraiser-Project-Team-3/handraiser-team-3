import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import mentor from "../assets/images/man.png";
import work from "../assets/images/work.svg";
import Tooltip from "@material-ui/core/Tooltip";

import Layout from "./reusables/Layout";

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: "#a5a5a5",
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default
		}
	}
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const useStyles = makeStyles({
	table: {
		minWidth: 700
	},
	total: {
		width: "100%",
		height: "22vh",
		marginBottom: "2vh",
		background:
			"linear-gradient(207deg, rgba(74,189,172,1) 0%, rgba(74,189,172,1) 37%, rgba(255,255,255,1) 37%)"
	},
	mentor: {
		width: "20px",
		marginRight: "10px"
	}
});

export const Admin = props => {
	const classes = useStyles();

	const [accountType] = useState("Admin");
	const { user } = props.data;
	const userDetails = user ? user : {};
	const { first_name } = userDetails;

	return (
		<Layout accountType={accountType} first_name={first_name}>
			<Grid container direction="row" spacing={2}>
				<Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
					<Paper
						className={classes.total}
						direction="column"
						style={{ height: "8vh", background: "white" }}
					>
						<Grid container justify="flex-start">
							<Grid item xs={4} align="center">
								<Tooltip title="Add User">
									<AddCircleIcon
										fontSize="large"
										style={{
											marginTop: "20px",
											color: "#4abdac",
											cursor: "pointer"
										}}
									/>
								</Tooltip>
							</Grid>

							<Grid item xs={8}>
								<div
									style={{
										backgroundImage: `url(${work})`,
										backgroundSize: "cover",
										backgroundPositionY: "-30px",
										height: "8vh"
									}}
								></div>
							</Grid>
						</Grid>
					</Paper>
					<Paper className={classes.total}></Paper>
					<Paper className={classes.total}></Paper>
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Names</StyledTableCell>
									<StyledTableCell>Email Address</StyledTableCell>
									<StyledTableCell align="center">Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<StyledTableRow key={row.name}>
										<StyledTableCell component="th" scope="row">
											{row.name}
										</StyledTableCell>
										<StyledTableCell>{row.calories}</StyledTableCell>
										<StyledTableCell align="center">
											<Button
												variant="contained"
												style={{ background: "#7dcec3" }}
												color="primary"
											>
												<img src={mentor} className={classes.mentor} />
												Set as Mentor
											</Button>
											{/* <Button
												variant="contained"
												style={{ background: "#fe8d8c" }}
												color="primary"
											>
												Remove as Mentor
											</Button> */}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Layout>
	);
};
