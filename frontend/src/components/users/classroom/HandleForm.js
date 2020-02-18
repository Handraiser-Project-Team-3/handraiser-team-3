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
    const [filterEmail, setFilterEmail] = useState([]);

    useEffect(() => {
        setFilterUser(classroomUsers
            .filter(x => x.class_id === classId)
            .filter(x => x.user_id !== user.id)
            .map(x => x.user_id));
    }, [classId, headers])
    console.log(filterUser)

    useEffect(() => {
        for (let z of filterUser) {
            let email = [];
            console.log(z)
            axios
                .get(`/api/user/${z}`, headers)
                .then(res => {
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
                    <TextField
                        disabled
                        margin="dense"
                        id="email_from"
                        defaultValue={user.email}
                        label="From"
                        type="email"
                        fullWidth
                    />
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
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
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="To"
                                placeholder="Email/s"
                                fullWidth
                            />
                        )}
                    />
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%", paddingRight: 5 }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="cc"
                                label="CC"
                                type="email"
                                fullWidth
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="bcc"
                                label="BCC"
                                type="email"
                                fullWidth
                            />
                        </div>
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="subject"
                        label="Subject"
                        type="email"
                        defaultValue="Classcode"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        id="message"
                        label="Message"
                        multiline
                        rows="4"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseForm} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}