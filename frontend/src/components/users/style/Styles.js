import { makeStyles } from "@material-ui/core/styles";
import head from "../../assets/images/bg.jpg";

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
	root: {
		background:
			"linear-gradient(0deg, rgba(171,171,250,1) 0%, rgba(255,255,255,1) 64%)",
		height: "57vh",
		overflow: "auto",
		padding: "0",
		position: "relative"
	},
	banner: {
		width: "100%",
		height: "auto",
		background:
			"linear-gradient(420deg, rgba(52,52,181,1) 0%, rgba(92,117,190,1) 27%, rgba(171,171,250,1) 68%, rgba(255,255,255,1) 100%)"
	},
	needHelp: {
		padding: "15px",
		margin: "20px"
	},
	studentsNeed: {
		color: "gray"
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
		width: "100%"
	},
	handContainer: {
		marginTop: "-60px ",
		display: "flex",
		justifyContent: "flex-end",
		paddingRight: "15px"
	},
	hand: {
		width: "45px",
		padding: "5px"
	}
}));

export const ChatBoxStyle = makeStyles(theme => ({
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
		color: "#8e9493"
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
	codeStyle: {
		fontSize: "14px",
		cursor: "pointer",
		"&:hover": {
			background: "#f19c76",
			color: "white"
		}
	}
}));
