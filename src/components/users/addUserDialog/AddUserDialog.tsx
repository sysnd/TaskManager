import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { User } from '../../../interfaces/User';

export default function FormDialog(props: any) {

    const
        {
            open,
            setOpen,
            userToUpdate,
            handleSubmit,
            usernameErrorProps,
            passwordErrorProps,
            firstNameErrorProps,
            lastNameErrorProps,
            unsetErrorProps
        } = props || {};

    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        isAdmin: false
    })

    useEffect(() => {
        if (open === true) {
            if (userToUpdate !== undefined) {
                setUser(userToUpdate);
            }
        }
    }, [open, userToUpdate])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (user: User) => {
        handleSubmit(user);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle id='form-dialog-title'>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        value={user.firstName || ''}
                        onChange={(e) => {
                            setUser({ ...user, firstName: e.target.value });
                            unsetErrorProps("firstName");
                        }}
                        fullWidth
                        autoFocus
                        required
                        label='First Name'
                        type='text'
                        variant='outlined'
                        margin='dense'
                        error={firstNameErrorProps.error}
                        helperText={firstNameErrorProps.helperText}
                    />
                     <TextField
                        value={user.lastName || ''}
                        onChange={(e) => {
                            setUser({ ...user, lastName: e.target.value });
                            unsetErrorProps("lastName");
                        }}
                        fullWidth
                        required
                        label='Last Name'
                        type='text'
                        variant='outlined'
                        margin='dense'
                        error={lastNameErrorProps.error}
                        helperText={lastNameErrorProps.helperText}
                    />
                     <TextField
                        value={user.username || ''}
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                            unsetErrorProps("username");
                        }}
                        fullWidth
                        required
                        label='Username'
                        type='text'
                        variant='outlined'
                        margin='dense'
                        error={usernameErrorProps.error}
                        helperText={usernameErrorProps.helperText}
                    />
                     <TextField
                        value={user.password || ''}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                            unsetErrorProps("password");
                        }}
                        fullWidth
                        required
                        label='Password'
                        type='password'
                        variant='outlined'
                        margin='dense'
                        error={passwordErrorProps.error}
                        helperText={passwordErrorProps.helperText}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={user.isAdmin}
                                onClick={(e: any) => setUser({ ...user, isAdmin: e.target.checked })}
                                color="primary"
                            />
                        }
                        label="Admin"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary' variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={() => handleAdd(user)} color='primary' variant='outlined'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
