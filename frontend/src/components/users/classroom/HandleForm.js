import React, { useState, useEffect } from 'react';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function HandleForm(props) {
    const {
        form,
        handleCloseForm,
        data,
        classes,
        user,
        classId,
        headers
    } = props
    const [fullWidth,] = useState(true);
    const [maxWidth] = useState('sm');
    const [filterUser, setFilterUser] = useState([]);
    const [to, setTo] = useState([]);

    useEffect(() => {
        let tempData = [];
        axios
            .get(`/api/user/list`, headers)
            .then(data => {
                tempData = data.data
                setFilterUser(tempData
                    .filter(acc => acc.account_type_id === 3)
                )
            })
            .catch(e => console.log(e))
    }, [headers])

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.email
    });

    const messageTemplate = {
        from: user.email,
        to: to,
        cc: user.email,
        name: "",
        subject: `HandRaiser - ${data.class_name}`,
        className: `${data.class_name}`,
        classCode: `${data.class_code}`,
        message: `You've ask to join the ${data.class_name} class. Enter this code to join: ${data.class_code}`
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (classId) {
        //     emailjs.send('gmail', 'classId', messageTemplate, 'user_WxE3R1PwGUTBLDfMHLKQ6')
        //         .then((result) => {
        //                 alertToast('Email sent!')
        //         }, (error) => {
        //             alertToast('Unable to send!')
        //             console.log(error.text)
        //         });
        // }
    }

    const handleChange = e => {
        let data = {};
        data = { ...to, e };
        setTo(data.e)
    };

    return (
        <div>
            <ToastContainer enableMulticontainer />
            <Chip
                variant="outlined"
                size="small"
                label={data.class_code}
                className={classes.codeStyle}
            />
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
                        <TextField
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
                        <Autocomplete
                            multiple
                            options={filterUser}
                            filterOptions={filterOptions}
                            disableCloseOnSelect
                            getOptionLabel={option => option.email}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    <Checkbox
                                        name="to"
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                        onClick={handleChange(option.email)}
                                    />
                                    {option.email}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    required
                                    label="To"
                                    name="to"
                                    multiline
                                    type="text"
                                    id={`to-${classId}`}
                                    placeholder="Email/s"
                                    fullWidth
                                />
                            )}
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
                    <Button form={classId} type="submit" color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const alertToast = msg =>
    toast.info(msg, {
        position: "top-right",
        autoClose: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });