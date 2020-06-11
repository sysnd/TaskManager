import React, { useEffect, useState } from 'react';
import ViewUsers from './ViewUsers';
import { User } from '../../interfaces/User';
import { Guid } from 'guid-typescript';
import { getLoggedInUserRequest } from '../../services/auth/AuthService';
import { useSnackbar } from 'notistack';
import { addUserRequest, updateUserRequest, deleteUserRequest, getUsers } from '../../services/users/UsersService';
import { Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ContainerUsers = () => {

    const [users, setUsers] = useState([] as User[]);
    const [open, setOpen] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    let loggedInUser = getLoggedInUserRequest();

    const saveUser = (user: User) => {
        if (user.id !== '') {
            updateUser(user);
        }
        else {
            addUser(user);
        }
    }

    const addUser = (user: User) => {
        user.id = Guid.create().toString();
        addUserRequest(user);
        enqueueSnackbar("Successfully added user.", { variant: 'success' });
        setOpen(false);
        setShouldUpdate(true);
    }

    const updateUser = (user: User) => {
        updateUserRequest(user);
        enqueueSnackbar("Successfully updated user.", { variant: 'success' });
        setOpen(false);
        setShouldUpdate(true);
    }

    const deleteUser = (user: User) => {
        if (loggedInUser.isAdmin === true) {
            deleteUserRequest(user.id);
            enqueueSnackbar("Successfully deleted user.", { variant: 'success' });
            setShouldUpdate(true);
        }
        else {
            enqueueSnackbar("You can not delete this user.", { variant: 'success' });
        }
    }

    useEffect(() => {
        let users = getUsers();
        if (users) {
            setUsers(users);
        }
    }, [shouldUpdate]);

    return loggedInUser.isAdmin ? <ViewUsers
        users={users}
        deleteUser={deleteUser}
        saveUser={saveUser}
        open={open}
        setOpen={setOpen}
        loggedInUser={loggedInUser}
    />
        :
        <Box style={{ textAlign: 'center' }}>
            <Typography>You don't have sufficient rights to view this page.</Typography>
            <Link to={{ pathname: '/' }}>Go Back</Link>
        </Box>
        ;
};

export default ContainerUsers;
