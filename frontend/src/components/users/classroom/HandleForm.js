import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import copy from "clipboard-copy";
import emailjs from "emailjs-com";
import Tooltip from "@material-ui/core/Tooltip";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function HandleForm(props) {
  const { data, classes, user, classId, headers } = props;
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("sm");
  const [form, setForm] = useState(false);
  const [filterUser, setFilterUser] = useState([]);
  const [emailArray, setEmailArray] = useState([]);
  const [sending, setSending] = useState(false);

  const handleForm = () => {
    setForm(true);
  };

  const handleCloseForm = () => {
    setForm(false);
  };

  useEffect(() => {
    let tempData = [];
    axios
      .get(`/api/user/list`, headers)
      .then(data => {
        tempData = data.data;
        setFilterUser(tempData.filter(acc => acc.account_type_id === 3));
      })
      .catch(e => console.log(e));
  }, [headers]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: option => option.email
  });

  const messageTemplate = {
    from: user.email,
    cc: user.email,
    subject: `HandRaiser - ${data.class_name}`,
    className: `${data.class_name}`,
    classCode: `${data.class_code}`,
    message: `You've ask to join the ${data.class_name} class. Enter this code to join: ${data.class_code}`
  };

  const handleSubmit = e => {
    setSending(true);
    e.preventDefault();
    if (classId && emailArray.length) {
      emailArray.map(to => {
        emailjs
          .send(
            "sendgrid",
            "classId",
            { ...messageTemplate, to: to },
            "user_WxE3R1PwGUTBLDfMHLKQ6"
          )
          .then(
            result => {
              setSending(false);
              toast.success("Email sent!");
              handleCloseForm();
            },
            error => {
              console.log(error.text);
            }
          );
      });
    }
  };

  const handleChange = e => {
    setEmailArray(e.map(email => email.email));
  };

  return (
    <div>
      <Tooltip title="Copy and send">
        <Chip
          variant="outlined"
          size="small"
          label={data.class_code}
          className={classes.codeStyle}
          onClick={() => {
            handleForm();
            copy(data.class_code);
          }}
        />
      </Tooltip>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={form}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email</DialogTitle>
        <DialogContent>
          <form
            id={classId}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex" }}>
              <TextField
                style={{ width: "50%", paddingRight: 5 }}
                required
                disabled
                margin="dense"
                id={`emailForm-${classId}`}
                name="from"
                defaultValue={messageTemplate.from}
                label="From"
                type="email"
                fullWidth
              />
              <TextField
                style={{ width: "50%" }}
                margin="dense"
                id={`cc-${classId}`}
                name="cc"
                InputProps={{
                  readOnly: true
                }}
                defaultValue={messageTemplate.from}
                label="cc (auto)"
                type="email"
                fullWidth
              />
            </div>
            <Autocomplete
              multiple
              options={filterUser}
              filterOptions={filterOptions}
              disableCloseOnSelect
              getOptionLabel={option => (option ? option.email : null)}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.email}
                </React.Fragment>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label="To"
                  multiline
                  id={`to-${classId}`}
                  placeholder="Email/s"
                  fullWidth
                />
              )}
              onChange={(option, value) => handleChange(value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id={`subject-${classId}`}
              name="subject"
              label="Subject"
              type="text"
              multiline
              defaultValue={messageTemplate.subject}
              fullWidth
            />
            <TextField
              autoFocus
              id={`message-${classId}`}
              name="msg"
              label="Message Template (view only)"
              type="text"
              multiline
              rows="10"
              InputProps={{
                readOnly: true
              }}
              defaultValue={messageTemplate.message}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          {!emailArray.length ? (
            <Button form={classId} type="submit" color="primary" disabled>
              Send
            </Button>
          ) : (
            <Button
              form={classId}
              type="submit"
              color="primary"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
