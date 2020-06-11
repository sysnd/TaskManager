import React, { useState } from 'react';
import ViewLogin from './ViewLogin';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { loginRequest } from '../../services/auth/AuthService';

const ContainerLogin = (props: any) => {
    const { history } = props || {};
    const [usernameErrorProps, setUsernameErrorProps] = useState({ error: false, helperText: '' });
    const [passwordErrorProps, setPasswordErrorProps] = useState({ error: false, helperText: '' });

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (username: string, password: string) => {
        let isFormValid = true;
        if (username === '') {
            setUsernameErrorProps({ error: true, helperText: "Username is required" });
            isFormValid = false;
        }
        if (password === '') {
            setPasswordErrorProps({ error: true, helperText: "Password is required" });
            isFormValid = false;
        }

        if (!isFormValid) {
            return;
        }

        let response = loginRequest(username, password);
        if (response === true) {
            history.push('/');
        }
        else {
            enqueueSnackbar("Your credentials are incorrect", { variant: 'error' });
        }
    }

    return <ViewLogin
        handleSubmit={handleSubmit}
        usernameErrorProps={usernameErrorProps}
        passwordErrorProps={passwordErrorProps}
    />;
};

export default withRouter(ContainerLogin);
