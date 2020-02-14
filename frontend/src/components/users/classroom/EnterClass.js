import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import _ from 'underscore';

export default function EnterClass({
  classEnter,
  setOpen,
  classroomUsers,
  user,
  initialIdList
}) {
  const [initial, setInitial] = useState([]);
  const [check, setCheck] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    setInitial(classroomUsers &&
      classroomUsers
        .filter(x => x.user_id === user.id)
        .map(x => x.class_id))
    // logic: find every values of initial array in the initialIdList array
    console.log(_.intersection(initialIdList, initial))
    let x = _.intersection(initialIdList, initial);
    // eslint-disable-next-line
  }, [classroomUsers]);

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
