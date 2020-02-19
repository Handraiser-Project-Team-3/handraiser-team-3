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
    const [maxWidth] = useState('xs');
    const [filterUser, setFilterUser] = useState([]);
    const [name] = useState('');
    const [filterEmail, setFilterEmail] = useState();
    const [to, setTo] = useState({});

    useEffect(() => {
        axios
            .get(`/api/classroom-users/${classId}`, headers)
            .then(res => {
                console.log(res)
            })
        // setFilterUser(classroomUsers
        //     .filter(x => x.class_id === classId)
        //     .filter(x => x.user_id !== user.id)
        //     .map(x => x.user_id));
    }, [classroomUsers, classId, headers, user.id])
    console.log(classId)
    useEffect(() => {
        filterUser.map(data => {
            let email = [];
            axios
                .get(`/api/user/${data}`, headers)
                .then(res => {
                    console.log(res)
                    // email.push(res.data)
                    // setName(res.data.first_name)
                    // setFilterEmail()
                })
                .catch(e => console.log(e))
        })

    }, [filterUser, headers])
    // console.log(filterEmail)
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.email
    });

    const messageTemplate = {
        from: user.email,
        to: to,
        cc: user.email,
        name: name,
        subject: `HandRaiser - ${data.class_name}`,
        className: `${data.class_name}`,
        classCode: `${data.class_code}`
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (classId) {
            emailjs.send('b@tm4n', 'classId', messageTemplate, 'user_WxE3R1PwGUTBLDfMHLKQ6')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        }
    }

    const handleChange = e => {
        let data = {};
        data = { ...to, e };
        setTo(data.e)
    };

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
                            options={filterEmail}
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
                                        onClick={e => handleChange(option.email)}
                                    />
                                    {option.email}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="To"
                                    name="to"
                                    multiline
                                    rows="2"
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
                            rows="10"
                            type="text"
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