import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import head from "../../assets/images/bg.jpg";
import Background from "../../assets/images/backg.png";

export const ClassroomStyle = makeStyles(theme => ({
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
  margin: {
    "@media (max-width: 1024px)": {
      margin: "0"
    }
  },
  root: {
    background:
      "linear-gradient(0deg, rgba(171,171,250,1) 0%, rgba(255,255,255,1) 64%)",
    height: 530,
    borderRadius: "0 0 5px 5px",
    overflow: "auto",
    padding: "0",
    position: "relative"
  },
  banner: {
    width: "100%",
    height: "auto",
    padding: "0 5px 0 0 ",
    background:
      "linear-gradient(90deg, rgba(95,71,194,1) 0%, rgba(192,162,255,1) 70%, rgba(171,171,250,1) 100%, rgba(255,255,255,1) 100%)"
  },
  bannerFlip: {
    width: "100%",
    height: "auto",
    background: "#ababfa",
    overflow: "auto"
  },
  needHelp: {
    padding: "15px",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  studentsNeed: {
    color: "gray",
    display: "flex",
    alignItems: "center"
  },
  appBar: {
    background: "#f1f0fa"
  },
  studentsAvatar: {
    marginRight: "10px"
  },
  divStyle: {
    height: "auto",
    background: "#ececfe",
    position: "sticky",
    bottom: "0px",
    width: "100%",
    margin: "-40px 0 0 0"
  }
}));

export const ChatBoxStyle = makeStyles(theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: 1
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
    height: 495,
    overflow: "auto",
    margin: "10px 0 10px 0 "
  },
  inputArea: {
    paddingTop: "5px",
    alignItems: "center",
    justifyContent: "center"
  },
  inputAreacontainer: {
    display: "flex",
    mentorAvatar: {
      position: "fixed"
    }
  },
  spanStyle: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "whitesmoke",
    wordBreak: " break-all",
    border: " 2px solid #ababfa",
    padding: "10px",
    borderRadius: "5px 20px"
  }
}));

export const ClassViewStyle = makeStyles(theme => ({
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
  popover: {
    pointerEvents: "none"
  },
  header: {
    height: "auto",
    backgroundImage: `url(${head})`,
    backgroundSize: "cover",
    padding: "20px",
    paddingTop: "85px"
  },
  color: {
    color: "gray",
    paddingLeft: "35px"
  },
  res: {
    "@media (max-width: 415px)": {
      display: "none"
    }
  },
  blackboard: {
    width: "35px",
    padding: "0"
  },
  container: {
    margin: "50px 8vw 10px 8vw"
  },
  classStyle: {
    color: "#f7b733",
    textDecoration: "underline",
    textDecorationColor: "lightgray",
    textUnderlinePosition: "under"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140,
    backgroundPositionY: "-20px"
  },
  addClass: {
    cursor: "pointer",
    color: "pink"
  },
  icons: {
    width: "20px",
    cursor: "pointer",
    "&:hover": {
      width: "23px",
      borderRadius: "10%"
    }
  },
  noClasses: {
    fontSize: "30px",
    color: "gray"
  },
  margin: {
    margin: "0 auto",
    marginTop: "10%",
    display: "flex",
    alignItems: "baseline"
  },
  customWidth: {
    maxWidth: 384
  },
  codeStyle: {
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      background: "gray"
    }
  }
}));

export const StyledBadgeGreen = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);
export const StyledBadgeWhite = withStyles(theme => ({
  badge: {
    backgroundColor: "lightgrey",
    color: "lightgrey",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);

export const LoginStyle = makeStyles(theme => ({
  bg: {
    backgroundImage: `url(${Background})`,
    height: "100vh",
    backgroundSize: "cover",
    opacity: "0.9",
    "&:hover": {
      opacity: "1"
    }
  },
  handRaiserLogo: {
    width: "180px"
  },
  svg: {
    width: "100%",
    position: "absolute",
    bottom: "0px",
    margin: "0 auto"
  },
  title: {
    writingMode: "vertical-lr",
    textOrientation: "upright",
    fontSize: "40px"
  },
  titleGrid: {
    background: "#8245dc",
    height: "101.2vh",
    width: "100%",
    fontWeight: "bold"
  },
  thirdCont: {
    background: "#ffffff",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    "@media (max-width: 1279px)": {
      background:
        "linear-gradient(0deg, rgba(207,176,255,1) 5%, rgba(171,171,250,1) 65%, rgba(255,255,255,1) 100%)"
    }
  },
  access: {
    color: "gray",
    paddingTop: "20px",
    "@media (max-width: 1440px)": {
      padding: "20px 40px 0px 40px"
    },
    "@media (max-width: 1279px)": {
      padding: "10px",
      color: "white"
    }
  },
  google: {
    height: "50px",
    marginTop: "70px"
  },
  gif: {
    width: "45%",
    marginTop: "60px"
  },
  welcome: {
    fontSize: "100px",
    color: "#9760e6",
    textShadow: "3px 2px black",
    paddingTop: "50px",
    "@media (max-width: 1279px)": {
      fontSize: "70px"
    }
  },
  logo: {
    width: "150px",
    marginTop: "100px",
    "@media (max-width: 1279px)": {
      marginTop: "50px"
    }
  }
}));
