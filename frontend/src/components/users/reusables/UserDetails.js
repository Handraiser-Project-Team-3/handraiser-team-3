import React from "react";
import Axios from "axios";

// material ui
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

// images
import student from "../../assets/images/student.png";

const useStyles = makeStyles(theme => ({
	style: {
		"&:hover": {
			color: "gray"
		}
	}
}));

export const UserDetails = ({ id, headers, action, profile }) => {
	const classes = useStyles();
	const [user, setUser] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				const res = await Axios.get(`/api/user/${id}`, headers);
				setUser(res.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [id, headers]);

	return action === "name" ? (
		<span className={classes.style}>
			{user.first_name + " " + user.last_name}
		</span>
	) : action === "img" ? (
		user.user_image !== null ? (
			<img
				src={user.user_image}
				alt="profile"
				style={
					profile
						? {
								width: "150px",
								borderRadius: "50%",
								marginTop: "20px",
								border: "5px solid #aaaafa",
								padding: "5px"
						  }
						: {
								width: "60px",
								borderRadius: "50%",
								border: "2px solid #ababfa",
								padding: "3px"
						  }
				}
			/>
		) : (
			<Avatar
				alt="avatar"
				src={student}
				style={{
					width: "150px",
					height: "150px",
					marginTop: "20px",
					border: "5px solid #aaaafa",
					padding: "5px"
				}}
			/>
		)
	) : (
		""
	);
};

export const user_details = async (id, headers) => {
	try {
		return await Axios.get(`/api/user/${id}`, headers);
	} catch (err) {
		console.error(err);
	}
};

export const getStudentDetails = async (id, headers) => {
  try {
    return await Axios.get(`/api/classroom-users/${id}`, headers);
  } catch (err) {
    console.log(err);
  }
};

export const class_details = async (id, headers) => {
	try {
		return await Axios.get(`/api/class/${id}`, headers);
	} catch (err) {
		console.error(err);
	}
};
