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

    const { enqueueSnackbar } = useSnackbar();
    let loggedInUser = getLoggedInUserRequest();

    const saveTask = (task: Task) => {
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

    useEffect(() => {
        let tasks = getTasks();
        if (tasks) {
            setTasks(tasks);
        }
    }, [shouldUpdate]);

    return <ViewTasks
        tasks={tasks}
        deleteTask={deleteTask}
        saveTask={saveTask}
        open={open}
        setOpen={setOpen}
        loggedInUser={loggedInUser}
    />;
};

export default ContainerTasks;
