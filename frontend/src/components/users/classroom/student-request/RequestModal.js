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
import NotInterestedIcon from "@material-ui/icons/NotInterested";

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
  /* eslint-disable */
  const classes = useStyles();
  const {
    addNewRequest,
    handleSubmitNewRquest,
    setList,
    list,
    account_type_id,
    open,
    setOpen,
    requests
  } = props;

  const { register, errors, setError, handleSubmit, clearError } = useForm();

  const [direction] = React.useState("left");
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [hidden] = React.useState(false);
  const [actions, setActions] = React.useState([]);

  const handleSpeedDial = () => {
    setOpenSpeedDial(!openSpeedDial);
  };

  // modal
  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (account_type_id === 2) {
      setActions([
        {
          icon: <ListIcon style={{ color: "#00579b" }} />,
          name: "List of Members",
          func: () => setList(!list)
        }
      ]);
    } else {
      if (!!requests) {
        requests.filter(req => req.status === null || req.status === false)
          .length <= 0
          ? setActions([
            {
              icon: (
                <PanToolIcon
                  style={{ margin: "0 0 0 -3px", color: "#00579b" }}
                />
              ),
              name: "Raise your concern",
              func: () => setOpen(!open)
            },
            {
              icon: <ListIcon style={{ color: "#00579b" }} />,
              name: "List of Members",
              func: () => setList(!list)
            }
          ])
          : setActions([
            {
              icon: (
                <span>
                  <PanToolIcon
                    style={{ margin: "0 0 0 -3px", color: "#00579b" }}
                  />
                  <NotInterestedIcon
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      fontSize: 40,
                      color: "#ff6f61"
                    }}
                  />
                </span>
              ),
              name: "You can only have 2 requests",
              func: () => { }
            },
            {
              icon: <ListIcon style={{ color: "#00579b" }} />,
              name: "List of Members",
              func: () => setList(!list)
            }
          ]);
      }
    }
  }, [account_type_id, requests, setList, list, open, setOpen]);
  return (
    <div>
      <div className={classes.handContainer}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          hidden={hidden}
          className={classes.handContainer}
          icon={<SpeedDialIcon className={classes.add} />}
          onClose={handleSpeedDial}
          onOpen={handleSpeedDial}
          open={openSpeedDial}
          direction={direction}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
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
                clearError(e.target.name);
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
