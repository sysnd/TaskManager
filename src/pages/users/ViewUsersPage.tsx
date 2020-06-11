import React from 'react';
import ContainerUsers from '../../components/users/ContainerUsers';
import styles from './StylesUsersPage';
import { Box } from '@material-ui/core';

const ViewUsersPage = () => {
    const classes = styles();

    return (
        <Box className={classes.container}>
            <ContainerUsers />
        </Box>
    );

}

export default ViewUsersPage;