import { useEffect, useState } from "react";
import { user_details } from "./UserDetails";

export default function CountUsers({ classId, classroomUsers, headers }) {
  const [usersCount, setUsersCount] = useState("");

  useEffect(() => {
    classroomUsers &&
      Promise.all(
        classroomUsers
          .filter(res => res.class_id === classId)
          .map(res =>
            user_details(res.user_id, headers).then(res => {
              return res.data.account_type_id === 3 && res.data;
            })
          )
      ).then(res => setUsersCount(res.filter(res => res !== false).length));
  }, [classroomUsers, classId, headers]);

  return usersCount;
}
