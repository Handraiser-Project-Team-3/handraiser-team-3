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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function HandleForm(props) {
    const {
        form,
        handleCloseForm,
        data,
        classes,
        user,
        classroomUsers,
        classId,
        headers
    } = props
    const [fullWidth,] = useState(true);
    const [maxWidth] = useState('sm');
    const [filterUser, setFilterUser] = useState([]);
    const [name, setName] = useState('');
    const [filterEmail, setFilterEmail] = useState([]);
    const [to, setTo] = useState('');

    useEffect(() => {
        setFilterUser(classroomUsers
            .filter(x => x.class_id === classId)
            .filter(x => x.user_id !== user.id)
            .map(x => x.user_id));
    }, [classroomUsers, classId, headers, user.id])

    useEffect(() => {
        for (let z of filterUser) {
            let email = [];
            axios
                .get(`/api/user/${z}`, headers)
                .then(res => {
                    setName(res.data.first_name)
                    email.push(res.data)
                    setFilterEmail(email)
                })
                .catch(e => console.log(e))
        }
    }, [filterUser, headers])

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.email
    });

    const messageTemplate = {
        from: user.email,
        cc: user.email,
        name: name,
        subject: `HandRaiser - ${data.class_name}`,
        msg: `You've ask to join the ${data.class_name} class, enter this code to join: ${data.class_code}.
        If it didn't appeared in inbox, check the spam folder.`
    }

    const handleSubmit = e => {
        e.preventDefault();

        emailjs.send('b@tm4n', 'classId', messageTemplate, 'user_WxE3R1PwGUTBLDfMHLKQ6')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    const handleChange = e => {
        console.log(e)
    }
    console.log(classId)
    return (
        <div>
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
                            id={`to-${classId}`}
                            name="to"
                            options={filterEmail}
                            filterOptions={filterOptions}
                            disableCloseOnSelect
                            getOptionLabel={option => option.email}
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
                            style={{ width: 450 }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    required
                                    label="To"
                                    onChange={handleChange}
                                    placeholder="Email/s"
                                    fullWidth
                                />
                            )}
                        />
                        {/* <div style={{ display: "flex" }}> */}
                        <div style={{ width: "50%", paddingRight: 5 }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id={`cc-${classId}`}
                                name="cc"
                                label="CC (Optional)"
                                type="email"
                                defaultValue={messageTemplate.cc}
                                fullWidth
                            />
                        </div>
                        {/* <div style={{ width: "50%" }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id={`bcc-${classId}`}
                                    name="bcc"
                                    label="BCC (Optional)"
                                    type="email"
                                    fullWidth
                                />
                            </div>
                        </div> */}
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id={`subject-${classId}`}
                            name="subject"
                            label="Subject"
                            type="text"
                            defaultValue={messageTemplate.subject}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            id={`message-${classId}`}
                            name="msg"
                            label="Message"
                            multiline
                            rows="4"
                            type="text"
                            defaultValue={messageTemplate.msg}
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