import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  search: {
    marginBottom: "1vh",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ababfa",
    color: "white",
    "&:hover": {
      backgroundColor: "#efefef",
      color: "gray"
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    "@media only screen and (min-width: 1024px)": {
      width: "90%"
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3)
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const { filter, setClassList, setUsers, typeId, setActivePage } = props;

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setActivePage(1);
    filter &&
      (typeId === 1
        ? setUsers(
          filter.filter(row =>
            row.email.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        )
        : setClassList(
          filter.filter(row =>
            row.class_name.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        ));

    // eslint-disable-next-line
  }, [searchTerm]);
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={searchTerm}
        onChange={handleChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
