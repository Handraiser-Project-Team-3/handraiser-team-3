import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Navbar from "../navigation/NavBar";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    height: 50
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}));

export default function Admin() {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [state, setState] = React.useState({
    columns: [
      { title: "Fullname", field: "name" },
      { title: "Email", field: "email" },
      {
        title: "Settings",
        field: "",
        render: rowData => (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={inputLabel}
              htmlFor="outlined-select-native-simple"
            >
              {""}
            </InputLabel>

            <Select // Select Button
              native
              value={state.select}
              inputProps={{
                name: "select",
                id: "outlined-select-native-simple"
              }}
            >
              <option value="" />
              <option value={10}>Set as Mentor</option>
              <option value={20}>Remove as Mentor</option>
            </Select>
          </FormControl>
        )
      }
    ],
    data: [
      { name: "Vince Gerard Ludovice", email: "vince.ludovice@boom.camp" }, //sample data
      { name: "Lyza mae Mirabete", email: "lyza.mirabete@boom.camp" }, //sample data
      { name: "Delfin Danas", email: "delfin.danas@boom.camp" }, //sample data
      { name: "Martha Dansyle Marbella", email: "martha.marbella@boom.camp" } //sample data
    ]
  });
  return (
    <div>
      <Navbar />
      <MaterialTable
        className={classes.table}
        title="Users List"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
        options={{
          headerStyle: {
            backgroundColor: "#4abdac",
            fontWeight: "bold"
          },
          rowStyle: {
            backgroundColor: "#f2f2f2"
          }
        }}
      />
    </div>
  );
}
