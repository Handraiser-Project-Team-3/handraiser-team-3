import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
  const { user, headers } = props.data;
  const userDetails = user ? user : {};
  const { first_name } = userDetails;
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState([]);
  const [userType, setUserType] = useState(3);

  useEffect(() => {
    // DISPLAY LIST
    axios.get("/api/user/list", headers).then(res => {
      setUsers(res.data);
    });
  }, []);

  function handleClickRemove(e) {
    // REMOVE MENTOR
    axios
      .patch(
        `/api/user/${e}`,
        {
          account_type_id: 3
        },
        headers
      )
      .then(() => toast.info("Mentor has been Removed!"));
  }
  function handleSetMentor(e) {
    // SET MENTOR
    axios
      .patch(
        `/api/user/${e}`,
        {
          account_type_id: 2
        },
        headers
      )
      .then(() => toast.info("Mentor has been Added!"));
  }
  function handleChange(e) {
    console.log(e);
  }

  function handleClickAdd(e) {
    console.log("clicked!");
  }

  return (
    <Layout accountType={accountType} first_name={first_name}>
      <ToastContainer enableMulticontainer />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Paper className={classes.paperStyle}>
            <Grid container align="center" alignItems="center">
              <Grid item xs={10} className={classes.gridStyle}>
                <form noValidate autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="Email Address"
                    value={email}
                    onChange={handleChange}
                    className={classes.textField}
                  />
                </form>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Add User">
                  <AddCircleIcon
                    value={email}
                    fontSize="large"
                    onClick={handleClickAdd}
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
              <Button
                variant="contained"
                style={{ background: "#7dcec3" }}
                color="primary"
                onClick={() => setUserType(3)}
              >
                <img src={teacher} className={classes.mentor} />
                Student
              </Button>
              &nbsp;
              <Button
                variant="contained"
                style={{ background: "#7dcec3" }}
                color="primary"
                onClick={() => setUserType(2)}
              >
                <img src={teacher} className={classes.mentor} />
                Mentor
              </Button>
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
                {users.map(
                  row =>
                    row.account_type_id === userType && (
                      <StyledTableRow key={row.email}>
                        <StyledTableCell component="th" scope="row">
                          {row.email}
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          {row.account_type_id === 3 && (
                            <Button
                              variant="contained"
                              style={{ background: "#7dcec3" }}
                              color="primary"
                              onClick={() => handleSetMentor(row.id)}
                            >
                              <img src={teacher} className={classes.mentor} />
                              Set as Mentor
                            </Button>
                          )}
                          {row.account_type_id === 2 && (
                            <Button
                              variant="contained"
                              style={{ background: "#fe8d8c" }}
                              color="primary"
                              onClick={() => handleClickRemove(row.id)}
                            >
                              Remove as Mentor
                            </Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};
