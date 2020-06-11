import React from 'react';
import ContainerTasks from '../../components/tasks/ContainerTasks';
import styles from './StylesTasksPage';
import { Box } from '@material-ui/core';

const ViewTasksPage = () => {
    const classes = styles();

    return (
        <Box className={classes.container}>
            <ContainerTasks />
        </Box>
    );

}

export default ViewTasksPage;