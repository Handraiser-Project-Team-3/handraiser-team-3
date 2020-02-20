import React, { useState, useEffect } from "react";
import axios from "axios";

// material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Typography } from "@material-ui/core";

// import Button from "@material-ui/core/Button";

// images
import Layout from "../reusables/Layout";

// components
import AddEmail from "./AddEmail";
import Confirmation from "./HandleUsers";
import Profile from "../reusables/Profile";
import { PaperStat } from "../reusables/Paper";
import Search from "../reusables/Search";
import Paginations from "../reusables/ComponentPagination";

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
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "whitesmoke"
    }
  },
  table: {
    minWidth: 700
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
  },
  tableHeight: {
    height: "65.5vh"
  },
  filter: {
    cursor: "pointer",
    color: "#3f51b5",
    "&:hover": {
      color: "gray"
    }
  }
});
export const Admin = props => {
  const classes = useStyles();
  const [accountType] = useState("Admin");
  const { user, headers, socket } = props.data;
  const userDetails = user ? user : {};
  const { first_name, account_type_id } = userDetails;
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState(2);
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [details, setDetails] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage] = useState(9);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios.get("/api/user/list", headers).then(res => {
      setUsers(res.data);
      setFilter(res.data);
    });
    // eslint-disable-next-line
  }, []);

  // const deleteClass = classid => {
  //   axios
  //     .delete(`/api/user/${classid}`, headers)
  //     .then(() => setUsers(users.filter(data => data.id !== classid)));
  // };
  //
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = row => {
    setDetails(row);
    setOpen(true);
    setHandle("remove");
  };
  const indexOfLastList = activePage * itemPerPage;
  const indexOfFirstList = indexOfLastList - itemPerPage;
  const currentUsers =
    userType === 3
      ? users.filter(res => res.account_type_id === 3)
      : users.filter(res => res.account_type_id === 2);

  return (
    <Layout
      accountType={accountType}
      first_name={first_name}
      typeId={account_type_id}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Paper className={classes.paperStyle}>
            <AddEmail headers={headers} setUsers={setUsers} users={users} />
          </Paper>
          <PaperStat users={users} />
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{ height: "auto" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: "bold",
                        color: "#aaaafa",
                        textShadow: "1px 1px purple"
                      }}
                    >
                      Users List
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11} md={4} lg={3} xl={3}>
                    <Search
                      filter={filter}
                      setUsers={setUsers}
                      typeId={account_type_id}
                      setActivePage={setActivePage}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <TableContainer className={classes.tableHeight}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ width: "40%" }}>
                          <span>Email Address</span>
                        </StyledTableCell>
                        <StyledTableCell align="center">Role</StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ paddingRight: "80px" }}
                        >
                          Action
                        </StyledTableCell>
                        <TableCell
                          align="right"
                          style={{ background: "#e1e2f7", width: "20px" }}
                        >
                          <Tooltip title="Filter List" arrow>
                            <FilterListIcon
                              onClick={handleClick}
                              className={classes.filter}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentUsers.length ? (
                        currentUsers
                          .slice(indexOfFirstList, indexOfLastList)
                          .map(
                            row =>
                              row.account_type_id === userType && (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell component="th" scope="row">
                                    <Profile
                                      email={row.email}
                                      account_type_id={row.account_type_id}
                                      first_name={row.first_name}
                                      last_name={row.last_name}
                                      userId={row.id}
                                      headers={headers}
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    <Chip
                                      variant="outlined"
                                      size="medium"
                                      label={
                                        userType === 3 ? "Student" : "Mentor"
                                      }
                                      style={
                                        userType === 3
                                          ? {
                                              borderColor: "#aaaafa",
                                              color: "#616161"
                                            }
                                          : {
                                              borderColor: "#f7b733",
                                              color: "#616161"
                                            }
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {row.account_type_id === 3 && (
                                      <>
                                        <Chip
                                          variant="outlined"
                                          size="medium"
                                          avatar={
                                            <Avatar
                                              style={{
                                                background: "#aaaafa",
                                                color: "white"
                                              }}
                                            >
                                              <FaceIcon />
                                            </Avatar>
                                          }
                                          label="Set as Mentor"
                                          onClick={() => {
                                            setDetails(row);
                                            setOpen(true);
                                            setHandle("set");
                                          }}
                                          style={{
                                            borderColor: "#aaaafa",
                                            color: "#616161"
                                          }}
                                        />
                                        {/* <div
																					onClick={() => deleteClass(row.id)}
																				>
																					delete
																				</div> */}
                                      </>
                                    )}
                                    {row.account_type_id === 2 && (
                                      <>
                                        <Chip
                                          variant="outlined"
                                          size="medium"
                                          label="Remove as Mentor"
                                          onDelete={() => handleDelete(row)}
                                          style={{
                                            borderColor: "#ff6f61ff",
                                            color: "#ff6f61ff"
                                          }}
                                        />
                                      </>
                                    )}
                                  </StyledTableCell>
                                  <TableCell
                                    style={{ width: "20px" }}
                                  ></TableCell>
                                </StyledTableRow>
                              )
                          )
                      ) : (
                        <TableRow>
                          <td>no results found</td>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                {users.length > 8 ? (
                  <Grid
                    style={{
                      marginTop: 25,
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Paginations
                      account_type_id={account_type_id}
                      totalPost={currentUsers.length}
                      setActivePage={setActivePage}
                      activePage={activePage}
                      itemPerPage={itemPerPage}
                    />
                  </Grid>
                ) : (
                  <Grid
                    style={{
                      marginTop: 65,
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "center"
                    }}
                  ></Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Confirmation
        setFilter={setFilter}
        setOpen={setOpen}
        open={open}
        details={details}
        headers={headers}
        handle={handle}
        setUsers={setUsers}
        socket={socket}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setUserType(3);
            setActivePage(1);
          }}
        >
          Student
        </MenuItem>
        <MenuItem
          onClick={() => {
            setUserType(2);
            setActivePage(1);
          }}
        >
          Mentor
        </MenuItem>
      </Menu>
    </Layout>
  );
};
