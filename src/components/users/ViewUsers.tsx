import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, IconButton } from '@material-ui/core';
import { User } from '../../interfaces/User';
import styles from './StylesUsers';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AddUserDialog from './addUserDialog/AddUserDialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SimpleDialog from '../common/dialog/SimpleDialog';

const ViewUsers = (props: any) => {
    const
        {
            users,
            deleteUser,
            open,
            setOpen,
            loggedInUser,
            handleSubmit,
            usernameErrorProps,
            passwordErrorProps,
            firstNameErrorProps,
            lastNameErrorProps,
            unsetErrorProps
        } = props || {};
    const classes = styles();

    const [currentUser, setCurrentUser] = useState<User>();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [addTitle, setAddTitle] = useState('');
    const [description, setDescription] = useState('');

    const disabledDelete = (user: User) => {
        if (loggedInUser.isAdmin && user.id !== loggedInUser.id) {
            return false;
        }
        else {
            return true;
        }
    }

    const disabledEdit = (user: User) => {
        if (loggedInUser.isAdmin) {
            return false;
        }
        else {
            return true;
        }
    }

    const openSimpleDialog = (title: string, description: string) => {
        setIsOpen(true);
        setTitle(title);
        setDescription(description);
    }

    const onContinue = (user: User) => {
        deleteUser(user);
        setIsOpen(false);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    return (
        <Box>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                startIcon={<NoteAddIcon />}
                onClick={() => {
                    setCurrentUser(undefined);
                    setAddTitle('Add User');
                    setOpen(true);
                }}
            >
                Add user</Button>
            <AddUserDialog
                open={open}
                setOpen={setOpen}
                userToUpdate={currentUser}
                handleSubmit={handleSubmit}
                usernameErrorProps={usernameErrorProps}
                passwordErrorProps={passwordErrorProps}
                firstNameErrorProps={firstNameErrorProps}
                lastNameErrorProps={lastNameErrorProps}
                unsetErrorProps={unsetErrorProps}
                title={addTitle}
            />
            <Box mt={3}>
                <TableContainer component={Paper} elevation={3} className={classes.container}>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Is Admin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length <= 0 ?
                                (
                                    <TableRow>
                                        <TableCell colSpan={4} className={classes.textAlign}>
                                            <Typography color='textSecondary' className={classes.text}>
                                                No records found.
                                        </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                                : (
                                    users.map((user: User, index: number) => (
                                        <React.Fragment key={index}>
                                            <TableRow className={index % 2 ? classes.lightRow : classes.darkRow}>
                                                <TableCell>
                                                    <Typography color='textSecondary' className={classes.text}>
                                                        {user.firstName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color='textSecondary' className={classes.text}>
                                                        {user.lastName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color='textSecondary' className={classes.text}>
                                                        {user.username}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color='textSecondary' className={classes.text}>
                                                        {user.isAdmin === true ? 'True' : 'False'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={{ width: '100px' }}>
                                                    <IconButton
                                                        type='submit'
                                                        color='primary'
                                                        onClick={() => {
                                                            setCurrentUser(user);
                                                            setAddTitle('Update User');
                                                            setOpen(true);
                                                        }}
                                                        disabled={disabledEdit(user)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        type='submit'
                                                        color='primary'
                                                        onClick={() => openSimpleDialog('Are you sure you want to delete this user?', 'This will remove the user permanently.')}
                                                        disabled={disabledDelete(user)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                    <SimpleDialog isOpen={isOpen} title={title} description={description} onCancel={onClose} onContinue={() => onContinue(user)} />
                                                </TableCell>
                                            </TableRow >
                                        </React.Fragment>
                                    )))}
                        </TableBody >
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default ViewUsers;