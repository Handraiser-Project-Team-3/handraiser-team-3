import React from "react";
import Axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import student from "../../assets/images/student.png";

export const UserDetails = ({ id, headers, action }) => {
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
        style={{ width: "30px", borderRadius: "50%" }}
      />
    ) : (
      <Avatar alt="avatar" src={student} />
    )
  ) : (
    ""
  );
};
