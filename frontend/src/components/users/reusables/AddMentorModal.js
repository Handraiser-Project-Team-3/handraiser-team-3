import React from "react";

import Select from "react-select";

import { css } from "emotion";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function({ open, setOpen, headers, socket, classId }) {
  const [mentorList, setMentorList] = React.useState([]);
  const [newMentors, setNewMentors] = React.useState([]);
  const handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    if (!!open && !!headers) {
      (async () => {
        try {
          const res = await Axios.get("/api/user/list", headers);
          setMentorList(
            res.data
              .filter(x => x.account_type_id === 2)
              .map(x => {
                return {
                  value: x.id,
                  label: x.email,
                  user_image: x.user_image
                };
              })
          );
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [open, headers]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { overflowY: "visible" } }}
        maxWidth={"xs"}
        fullWidth
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            handleClick();
            socket.emit(`add_mentors`, {
              newMentors: newMentors,
              classId: classId
            });
            setNewMentors([]);
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Add new Mentor"}</DialogTitle>
          <DialogContent style={{ overflowY: "visible" }}>
            <Select
              closeMenuOnSelect={false}
              components={{ Option }}
              isMulti
              options={mentorList}
              defaultValue={newMentors}
              onChange={value => setNewMentors(value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClick}>
              close
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
const Option = props => {
  const {
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
    data
  } = props;
  return (
    <div
      ref={innerRef}
      className={cx(
        css(getStyles("option", props)),
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected
        },
        className
      )}
      {...innerProps}
    >
      <Div>
        {data.user_image ? (
          <Img src={data.user_image} />
        ) : (
          <AccountCircleIcon style={{ fontSize: 30 }} />
        )}
        {data.label}
      </Div>
    </div>
  );
};
const Div = styled.div`
  padding: 5px 0 5px 15px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
