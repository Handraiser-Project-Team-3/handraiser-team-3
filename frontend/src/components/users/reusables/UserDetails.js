import React from "react";
import Axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import student from "../../assets/images/student.png";

export const UserDetails = ({ id, headers, action, profile }) => {
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
		<>{user.first_name + " " + user.last_name}</>
	) : action === "img" ? (
		user.user_image !== null ? (
			<img
				src={user.user_image}
				alt="man"
				style={{
					width: "30px",
					borderRadius: "50%",
					border: "2px solid #ff6f61",
					padding: "3px"
				}}
			/> ? (
				user.user_image !== null && profile
			) : (
				<img
					src={user.user_image}
					alt="man"
					style={{
						width: "80px",
						borderRadius: "50%",
						border: "2px solid #ff6f61",
						padding: "3px"
					}}
				/>
			)
		) : (
			<Avatar
				alt="avatar"
				src={student}
				style={{
					width: "80px",
					height: "80px",
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
