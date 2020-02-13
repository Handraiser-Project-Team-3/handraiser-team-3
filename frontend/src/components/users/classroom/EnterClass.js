import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function EnterClass({
  classEnter,
  setOpen,
  classroomUsers,
  user,
  initialIdList
}) {
  const [initial, setInitial] = useState([]);
  const [check, setCheck] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    setInitial(classroomUsers &&
      classroomUsers
        .filter(x => x.user_id === user.id)
        .map(x => x.class_id))
    // logic: find every values of initial array in the initialIdList array
    setCheck(initialIdList.some(v => initial.indexOf(v) !== -1));
    // eslint-disable-next-line
  }, [classroomUsers]);
  console.log(initial)
  console.log(initialIdList)

  return (
    <>
      {check ? (
        <Button
          size="small"
          style={{ color: "white" }}
          onClick={() => {
            classEnter();
          }}
        >
          Enter Class
    </Button>
      ) : (
          <Button
            size="small"
            style={{ color: "white" }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            Join Class
       </Button>
        )}
    </>
  );
}
