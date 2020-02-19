import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PanToolIcon from "@material-ui/icons/PanTool";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles(theme => ({
  icons: {
    width: "20px",
    cursor: "pointer",
    "&:hover": {
      width: "23px",
      borderRadius: "10%"
    }
  },
  formControl: {
    margin: theme.spacing(3)
  },
  titleOfrequest: {
    backgroundColor: "#AAAAF9",
    color: "white"
  },
  requestIcon: {
    color: "#474cb9",
    cursor: "pointer",
    "&:hover": {
      color: "brown"
    }
  },
  add: {
    color: "white"
  },
  handContainer: {
    marginTop: "-35px ",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    marginBottom: "1vh"
  },
  fab: {
    backgroundColor: "#5365BC",
    border: "solid 0px #ececfa",
    "&:hover": {
      borderWidth: "5px",
      backgroundColor: "#5365BC"
    }
  }
}));

export default function (props) {
  const classes = useStyles();
  const {
    addNewRequest,
    handleSubmitNewRquest,
    setList,
    list,
    account_type_id,
    open,
    setOpen
  } = props;

  const { register, errors, setError, handleSubmit } = useForm();

  const [direction] = React.useState("left");
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [hidden] = React.useState(false);

  const handleSpeedDial = () => {
    setOpenSpeedDial(!openSpeedDial);
  };

  // modal
  const handleClick = () => {
    setOpen(!open);
  };
  const actions = [
    {
      icon: <PanToolIcon onClick={() => handleClick()} />,
      name: "Raise your concern"
    },
    {
      icon: <ListIcon onClick={() => setList(!list)} />,
      name: "List of Members"
    }
  ];

  return (
    <div>
      <div className={classes.handContainer}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          hidden={hidden}
          className={classes.handContainer}
          icon={<SpeedDialIcon className={classes.add} />}
          onClick={handleSpeedDial}
          open={openSpeedDial}
          direction={direction}
        >
          {account_type_id === 3 ? (
            actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleSpeedDial}
              />
            ))
          ) : (
              <SpeedDialAction
                key={actions[1].name}
                icon={actions[1].icon}
                tooltipTitle={actions[1].name}
                onClick={handleSpeedDial}
              />
            )}
        </SpeedDial>
      </div>

      <Dialog
        className={classes.dialogMainContainer}
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleSubmitNewRquest)}
        >
          <DialogTitle
            id="form-dialog-title"
            className={classes.titleOfrequest}
          >
            Title of Request{" "}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              error={!!errors.request}
              variant="outlined"
              margin="normal"
              label="Request"
              name="request"
              fullWidth
              onChange={e => {
                if (e.target.value.length >= 30) {
                  return setError(
                    e.target.name,
                    "notMatch",
                    "Character limit reached!"
                  );
                }
                addNewRequest(e.target.value);
              }}
              inputRef={register({ required: "Title is required" })}
              helperText={errors.request && errors.request.message}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClick} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
