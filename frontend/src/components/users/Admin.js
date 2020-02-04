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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

import teacher from "../assets/images/mentor2.png";

import Layout from "./reusables/Layout";
import { PaperStat } from "./reusables/Paper";

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
	createData("Frozen yoghurt"),
	createData("Ice cream sandwich"),
	createData("Eclair"),
	createData("Cupcake"),
	createData("Gingerbread"),
	createData("Eclaira"),
	createData("Cupcakea"),
	createData("Gingerbreada")
];

const useStyles = makeStyles({
	table: {
		minWidth: 700,
		height: "74vh"
	},
	mentor: {
		width: "20px",
		marginRight: "10px"
	},
	gridStyle: {
		height: "8vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#d2efeb",
		borderTopLeftRadius: "5px",
		borderBottomLeftRadius: "5px"
	},
	paperStyle: {
		height: "8vh",
		background: "white",
		marginBottom: "2vh"
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
					<Paper className={classes.paperStyle}>
						<Grid container align="center" alignItems="center">
							<Grid item xs={10} className={classes.gridStyle}>
								<form noValidate autoComplete="off">
									<TextField
										id="standard-basic"
										label="Email Address"
										className={classes.textField}
									/>
								</form>
							</Grid>
							<Grid item xs={2}>
								<Tooltip title="Add User">
									<AddCircleIcon
										fontSize="large"
										style={{
											color: "#4abdac",
											cursor: "pointer"
										}}
									/>
								</Tooltip>
							</Grid>
						</Grid>
					</Paper>
					<PaperStat />
				</Grid>
				<Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Email Address</StyledTableCell>
									<StyledTableCell
										align="right"
										style={{ paddingRight: "80px" }}
									>
										Action
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<StyledTableRow key={row.name}>
										<StyledTableCell component="th" scope="row">
											{row.name}
										</StyledTableCell>

										<StyledTableCell align="right">
											<Button
												variant="contained"
												style={{ background: "#7dcec3" }}
												color="primary"
											>
												<img
													src={teacher}
													className={classes.mentor}
													alt="teacher"
												/>
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
