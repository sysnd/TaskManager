import { Task } from "../../interfaces/Task";

export const getTasks = () => {
    let tasksString = localStorage.getItem('tasks');
    let tasks: Task[] = [];

    if (tasksString) {
        tasks = JSON.parse(tasksString);
    }

    return tasks;
}

export const addTaskRequest = (task: Task) => {
    let tasks = getTasks();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const updateTaskRequest = (task: Task) => {
    let tasks = getTasks();
    let taskIndex = tasks.findIndex(x => x.id === task.id);

    tasks[taskIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const deleteTaskRequest = (taskId: string) => {
    let tasks = getTasks();
    let taskIndex = tasks.findIndex(x => x.id === taskId);

    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}