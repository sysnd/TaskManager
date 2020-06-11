import React, { useState } from 'react';
import ViewRegister from './ViewRegister';
import { registerRequest } from '../../services/auth/AuthService';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { User } from '../../interfaces/User';

const ContainerRegister = (props: any) => {
    const { history } = props || {};
    const [usernameErrorProps, setUsernameErrorProps] = useState({ error: false, helperText: '' });
    const [passwordErrorProps, setPasswordErrorProps] = useState({ error: false, helperText: '' });
    const [firstNameErrorProps, setFirstNameErrorProps] = useState({ error: false, helperText: '' });
    const [lastNameErrorProps, setLastNameErrorProps] = useState({ error: false, helperText: '' });

    const { enqueueSnackbar } = useSnackbar();

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

    const handleSubmit = async (user: User) => {
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


        let response = registerRequest(user);
        if (response.success === true) {
            enqueueSnackbar(response.message, { variant: 'success' });
            history.push('/login');
        }
        else {
            enqueueSnackbar(response.message, { variant: 'error' });
        }
    }

    return <ViewRegister
        handleSubmit={handleSubmit}
        usernameErrorProps={usernameErrorProps}
        passwordErrorProps={passwordErrorProps}
        firstNameErrorProps={firstNameErrorProps}
        lastNameErrorProps={lastNameErrorProps}
        unsetErrorProps={unsetErrorProps}
    />;
};

export default withRouter(ContainerRegister);
