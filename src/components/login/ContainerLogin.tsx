import React, { useState } from 'react';
import ViewLogin from './ViewLogin';
// import { loginRequest } from '../../services/auth/AuthService';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ContainerLogin = (props: any) => {
    const { history } = props || {};
    const [usernameErrorProps, setUsernameErrorProps] = useState({ error: false, helperText: '' });

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (userId: string) => {
        if (userId === '') {
            setUsernameErrorProps({ error: true, helperText: "User Id is required" });
            return;
        }

        const enqueueErrorSnackbar = () => { enqueueSnackbar("Failed to connect to the server.", { variant: "error" }); }
        let statusCode: number;

        // loginRequest(userId)
        //     .then(res:any => {
        //         statusCode = res.status;
        //         return statusCode === 200 ? res.json() : null;
        //     })
        //     .then(jsonRes => {
        //         if (statusCode === 200) {
        //             localStorage.setItem("authUserId", userId);
        //             localStorage.setItem("authUserFirstName", jsonRes.firstName)                    
        //             history.push('/');
        //         }
        //         else if (statusCode === 401) {
        //             setUserIdErrorProps({ error: true, helperText: "You credentials are incorrect" });
        //         }
        //         else {
        //             enqueueErrorSnackbar();
        //         }
        //     });
    }

    return <ViewLogin handleSubmit={handleSubmit} usernameErrorProps={usernameErrorProps} />;
};

export default withRouter(ContainerLogin);
