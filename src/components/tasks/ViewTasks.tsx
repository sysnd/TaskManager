import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button, IconButton } from '@material-ui/core';
import { Task } from '../../interfaces/Task';
import styles from './StylesTasks';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AddTaskDialog from './addTaskDialog/AddTaskDialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { TaskStatus } from '../../enums/TaskStatus';
import { getLoggedInUserRequest } from '../../services/auth/AuthService';

const ViewTasks = (props: any) => {
    const
        {
            tasks,
            deleteTask,
            saveTask,
            open,
            setOpen,
            loggedInUser
        } = props || {};
    const classes = styles();

    const [currentTask, setCurrentTask] = useState<Task>();

    const disabled = (task: Task) => {
        if(task.userId===loggedInUser.id){
            return false;
        }
        else if(loggedInUser.isAdmin){
            return false;
        }
        else{
            return true;
        }
    }

    return (
        <Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<NoteAddIcon />}
                onClick={() => setOpen(true)}
            >
                Add task</Button>
            <AddTaskDialog open={open} setOpen={setOpen} taskToUpdate={currentTask} saveTask={saveTask} />
            <Box mt={3}>
                <TableContainer component={Paper} elevation={3} className={classes.container}>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Estimation</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.length <= 0 ?
                                (
                                    <TableRow>
                                        <TableCell colSpan={4} className={classes.textAlign}>
                                            <Typography color="textSecondary" className={classes.text}>
                                                No records found.
                                        </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                                : (
                                    tasks.map((task: Task, index: number) => (
                                        <React.Fragment key={index}>
                                            <TableRow className={index % 2 ? classes.lightRow : classes.darkRow}>
                                                <TableCell>
                                                    <Typography color="textSecondary" className={classes.text}>
                                                        {task.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" className={classes.text}>
                                                        {task.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" className={classes.text}>
                                                        {task.estimation}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" className={classes.text}>
                                                        {TaskStatus[task.status]}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={{ width: '100px' }}>
                                                    <IconButton
                                                        type="submit"
                                                        color="primary"
                                                        onClick={() => {
                                                            setCurrentTask(task);
                                                            setOpen(true);
                                                        }}
                                                        disabled={disabled(task)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        type="submit"
                                                        color="primary"
                                                        onClick={() => deleteTask(task)}
                                                        disabled={disabled(task)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
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

export default ViewTasks;