import React from "react";
import Axios from "axios";
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
    <img
      src={user.user_image}
      alt="man"
      style={{ width: "30px", borderRadius: "50%" }}
    />
  ) : (
    ""
  );
};
