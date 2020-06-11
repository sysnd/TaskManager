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
    const [isFetched, setIsFetched] = useState(false);
    const [usernameErrorProps, setUsernameErrorProps] = useState({ error: false, helperText: '' });
    const [passwordErrorProps, setPasswordErrorProps] = useState({ error: false, helperText: '' });
    const [firstNameErrorProps, setFirstNameErrorProps] = useState({ error: false, helperText: '' });
    const [lastNameErrorProps, setLastNameErrorProps] = useState({ error: false, helperText: '' });

    const { enqueueSnackbar } = useSnackbar();
    let loggedInUser = getLoggedInUserRequest();

    const unsetErrorProps = (type: string) => {
        switch (type) {
            case 'password':
                setPasswordErrorProps({ error: false, helperText: '' });
                break;
            case 'username':
                setUsernameErrorProps({ error: false, helperText: '' });
                break;
            case 'firstName':
                setFirstNameErrorProps({ error: false, helperText: '' });
                break;
            case 'lastName':
                setLastNameErrorProps({ error: false, helperText: '' });
                break;
        }
    }

    const handleSubmit = (user: User) => {
        let isFormValid = true;
        if (user.username === '') {
            setUsernameErrorProps({ error: true, helperText: 'Username is required' });
            isFormValid = false;
        }
        if (user.password === '') {
            setPasswordErrorProps({ error: true, helperText: 'Password is required' });
            isFormValid = false;
        }
        if (user.firstName === '') {
            setFirstNameErrorProps({ error: true, helperText: 'First Name is required' });
            isFormValid = false;
        }
        if (user.lastName === '') {
            setLastNameErrorProps({ error: true, helperText: 'Last Name is required' });
            isFormValid = false;
        }

        if (!isFormValid) {
            return;
        }

        saveUser(user);
    }

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
        if (shouldUpdate || !isFetched) {
            let users = getUsers();
            if (users) {
                setUsers(users);
            }
            setShouldUpdate(false);
            setIsFetched(true);
        }
    }, [shouldUpdate, isFetched]);

    return loggedInUser.isAdmin ? <ViewUsers
        users={users}
        deleteUser={deleteUser}
        open={open}
        setOpen={setOpen}
        loggedInUser={loggedInUser}
        handleSubmit={handleSubmit}
        usernameErrorProps={usernameErrorProps}
        passwordErrorProps={passwordErrorProps}
        firstNameErrorProps={firstNameErrorProps}
        lastNameErrorProps={lastNameErrorProps}
        unsetErrorProps={unsetErrorProps}
    />
        :
        <Box style={{ textAlign: 'center' }}>
            <Typography>You don't have sufficient rights to view this page.</Typography>
            <Link to={{ pathname: '/' }}>Go Back</Link>
        </Box>
        ;
};

export default ContainerUsers;
