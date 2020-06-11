import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { User } from '../../../interfaces/User';

export default function FormDialog(props: any) {

    const { open, setOpen, saveUser, userToUpdate } = props || {};

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
        saveUser(user);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle id='form-dialog-title'>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='First Name'
                        type='text'
                        variant='outlined'
                        fullWidth
                        value={user.firstName || ''}
                        onChange={(e: any) => setUser({ ...user, firstName: e.target.value })}
                    />
                    <TextField
                        margin='dense'
                        label='Last Name'
                        type='text'
                        variant='outlined'
                        fullWidth
                        value={user.lastName || ''}
                        onChange={(e: any) => setUser({ ...user, lastName: e.target.value })}
                    />
                    <TextField
                        margin='dense'
                        label='Username'
                        type='number'
                        variant='outlined'
                        fullWidth
                        value={user.username || ''}
                        onChange={(e: any) => setUser({ ...user, username: e.target.value })}
                    />
                    <TextField
                        margin='dense'
                        label='Password'
                        type='number'
                        variant='outlined'
                        fullWidth
                        value={user.password || ''}
                        onChange={(e: any) => setUser({ ...user, password: e.target.value })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={user.isAdmin || false}
                                onChange={(e: any) => setUser({ ...user, isAdmin: e.target.value })}
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
