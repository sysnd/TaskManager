import React, { useEffect, useState } from 'react';
import ViewTasks from './ViewTasks';
import { Task } from '../../interfaces/Task';
import { Guid } from 'guid-typescript';
import { getLoggedInUserRequest } from '../../services/auth/AuthService';
import { addTaskRequest, updateTaskRequest, deleteTaskRequest, getTasks } from '../../services/tasks/TasksService';
import { useSnackbar } from 'notistack';

const ContainerTasks = () => {

    const [tasks, setTasks] = useState([] as Task[]);
    const [open, setOpen] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [titleErrorProps, setTitleErrorProps] = useState({ error: false, helperText: '' });
    const [estimationErrorProps, setEstimationErrorProps] = useState({ error: false, helperText: '' });

    const { enqueueSnackbar } = useSnackbar();
    let loggedInUser = getLoggedInUserRequest();

    const saveTask = (task: Task) => {
        let formIsValid = true;
        if (task.title === '') {
            setTitleErrorProps({ error: true, helperText: 'Title is required' });
            formIsValid = false;
        }
        if (!validateEstimation(task.estimation)) {
            formIsValid = false;
        }
        if (!formIsValid) {
            return;
        }

        if (task.id !== '') {
            updateTask(task);
        }
        else {
            addTask(task);
        }
    }
    const addTask = (task: Task) => {
        task.userId = loggedInUser?.id;
        task.id = Guid.create().toString();
        addTaskRequest(task);
        enqueueSnackbar("Successfully added task.", { variant: 'success' });
        setOpen(false);
        setShouldUpdate(true);
    }
    const updateTask = (task: Task) => {
        updateTaskRequest(task);
        enqueueSnackbar("Successfully updated task.", { variant: 'success' });
        setOpen(false);
        setShouldUpdate(true);
    }

    const deleteTask = (task: Task) => {
        if (loggedInUser.isAdmin === true ||
            task.userId === loggedInUser.id) {
            deleteTaskRequest(task.id);
        }
        enqueueSnackbar("Successfully deleted task.", { variant: 'success' });
        setShouldUpdate(true);
    }

    const validateEstimation = (estimation: any) => {
        if (estimation.includes('.') || !parseInt(estimation) || estimation < 0) {
            setEstimationErrorProps({ error: true, helperText: 'Estimation must be an integer bigger than 0' });
            return false;
        }
        else {
            setEstimationErrorProps({ error: false, helperText: '' });
            return true;
        }
    }

    useEffect(() => {
        if (shouldUpdate || !isFetched) {
            let tasks = getTasks();
            if (tasks) {
                setTasks(tasks);
            }
            setShouldUpdate(false);
            setIsFetched(true);
        }
    }, [shouldUpdate, isFetched]);

    return <ViewTasks
        tasks={tasks}
        deleteTask={deleteTask}
        saveTask={saveTask}
        open={open}
        setOpen={setOpen}
        loggedInUser={loggedInUser}
        titleErrorProps={titleErrorProps}
        setTitleErrorProps={setTitleErrorProps}
        estimationErrorProps={estimationErrorProps}
        validateEstimation={validateEstimation}
    />;
};

export default ContainerTasks;
