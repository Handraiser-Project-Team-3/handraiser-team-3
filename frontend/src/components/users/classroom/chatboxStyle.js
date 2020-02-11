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
    padding: "15px",
    backgroundColor: "#e2e3f7",
    marginTop: "1vh",
    borderRadius: "5px"
  },
  top: {
    background:
      "linear-gradient(207deg, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 22%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 26%, rgba(255,255,255,1) 72%, rgba(171,171,250,1) 72%, rgba(171,171,250,1) 73%)",
    padding: "0px",
    margin: "0px",
    width: "100%"
  },
  topName: {
    padding: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  convoBox: {
    backgroundColor: "whitesmoke",
    maxHeight: 500,
    height: "50vh",
    overflow: "auto",
    margin: "10px 0 10px 0",
    padding: "20px 10px 10px 10px"
  },
  inputArea: {
    paddingTop: "5px",
    alignItems: "center",
    justifyContent: "center"
  },
  inputAreacontainer: {
    display: "flex"
  },
  spanStyle: {
    display: "flex",
    backgroundColor: "whitesmoke",
    wordBreak: "break-all",
    border: " 2px solid #ababfa",
    padding: "10px 15px 10px 17px",
    margin: "0 5px 0 56px",
    borderRadius: "5px 20px"
  }
}));
