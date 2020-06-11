import { User } from "../../interfaces/User";
import { getTasks } from "../tasks/TasksService";

export const getUsers = () => {
    let usersString = localStorage.getItem('users');
    let users: User[] = [];

    if (usersString) {
        users = JSON.parse(usersString);
    }

    return users;
}

export const addUserRequest = (user: User) => {
    let users = getUsers();

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

export const updateUserRequest = (user: User) => {
    let users = getUsers();
    let userIndex = users.findIndex(x => x.id === user.id);

    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
}

export const deleteUserRequest = (userId: string) => {
    let users = getUsers();
    let userIndex = users.findIndex(x => x.id === userId);

    users.splice(userIndex, 1);
    let tasks = getTasks();
    let tasksToKeep = tasks.filter(x => x.userId !== userId);

    localStorage.setItem('tasks', JSON.stringify(tasksToKeep));
    localStorage.setItem('users', JSON.stringify(users));
}