import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
  root: {
    background:
      "linear-gradient(0deg, rgba(171,171,250,1) 0%, rgba(255,255,255,1) 64%)",
    border: "1px solid lightgray",
    height: 642,
    overflow: "auto",
    padding: "10px 0 0 0"
  },
  needHelp: {
    padding: "15px",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  studentsNeed: {
    display: "flex",
    alignItems: "center",
    color: "gray"
  },
  appBar: {
    background: "#f1f0fa"
  },
  studentsAvatar: {
    marginRight: "10px"
  },
  divStyle: {
    width: "100%",
    height: "auto",
    background: "#eff1fa",
    border: "1px solid lightgray",
    borderRadius: "5px"
  }
}));
