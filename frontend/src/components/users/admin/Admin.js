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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import teacher from "../../assets/images/mentor2.png";
import Layout from "../reusables/Layout";
import { PaperStat } from "../reusables/Paper";
import AddEmail from "./AddEmail";
import Confirmation from "./HandleUsers";

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
  const [userType, setUserType] = useState(3);
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios.get("/api/user/list", headers).then(res => {
      setUsers(res.data);
    });
  }, []);

  const deleteClass = classid => {
    axios
      .delete(`/api/user/${classid}`, headers)
      .then(() => setUsers(users.filter(data => data.id !== classid)));
  };

  return (
    <Layout accountType={accountType} first_name={first_name}>
      <ToastContainer enableMulticontainer />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Paper className={classes.paperStyle}>
            <AddEmail headers={headers} setUsers={setUsers} users={users} />
          </Paper>
          <PaperStat headers={headers} users={users} setUsers={setUsers} />
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
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.account_type_id === 3 && (
                            <>
                              <Button
                                variant="contained"
                                style={{ background: "#7dcec3" }}
                                color="primary"
                                onClick={() => {
                                  setDetails(row);
                                  setOpen(true);
                                  setHandle("set");
                                }}
                              >
                                <img src={teacher} className={classes.mentor} />
                                Set as Mentor
                              </Button>
                              <Button onClick={() => deleteClass(row.id)}>
                                delete
                              </Button>
                            </>
                          )}
                          {row.account_type_id === 2 && (
                            <Button
                              variant="contained"
                              style={{ background: "#fe8d8c" }}
                              color="primary"
                              onClick={() => {
                                setDetails(row);
                                setOpen(true);
                                setHandle("remove");
                              }}
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
      <Confirmation
        setOpen={setOpen}
        open={open}
        details={details}
        headers={headers}
        handle={handle}
        setUsers={setUsers}
      />
    </Layout>
  );
};
