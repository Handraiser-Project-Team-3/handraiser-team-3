import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

export default function AddEmail(props) {
  const classes = useStyles();
  const { headers, setUsers, users } = props;
  const [email, setEmail] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
  }
  function handleClickAdd(email) {
    console.log(email);
    const EmailVal = /^\w+([\.-]?\w+)*@\w+(boom)*(\.)(camp)+$/;
    // eslint-disable-line

    // if email is already registered!

    // display error message
    if (email.match(EmailVal)) {
      axios
        .post(
          "/api/user",
          {
            email: email,
            account_type_id: 3,
            user_status: true
          },
          headers
        )
        .then(res => {
          setUsers([...users, res.data]);
          toast.info("Email Address has been Added!");
        })
        .catch(err => toast.error("Email already taken!"));
    } else {
      toast.error("Please Enter Valid Email Address");
    }
  }
  return (
    <div>
      <Grid container align="center" alignItems="center">
        <Grid item xs={10} className={classes.gridStyle}>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Email Address"
              onChange={handleChange}
              className={classes.textField}
              value={email}
              type="email"
            />
          </form>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Add User">
            <AddCircleIcon
              value={email}
              fontSize="large"
              onClick={() => handleClickAdd(email)}
              style={{
                color: "#ababfa",
                cursor: "pointer"
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
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
    background: "#ababfa70",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px"
  },
  paperStyle: {
    height: "8vh",
    background: "white",
    marginBottom: "2vh"
  }
});
