import { User } from "../../interfaces/User";
import { getTasks } from "../tasks/TasksService";
import { RegisterResponse } from "../../interfaces/auth/RegisterResponse";
import { Guid } from "guid-typescript";

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
    let response: RegisterResponse = { success: false, message: 'A user with these credentials already exists.' };
    if (users.find(x => x.username === user.username)) {
        return response;
    }
    else {
        user.id = Guid.create().toString();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        response = { success: true, message: 'Successfully added user.' };
        return response;
    }
}

export const updateUserRequest = (user: User) => {
    let users = getUsers();
    let response: RegisterResponse = { success: false, message: 'A user with these credentials already exists.' };

    if (users.find(x => x.username === user.username && x.id !== user.id)) {
        return response;
    }
    else {
        let userIndex = users.findIndex(x => x.id === user.id);
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        response = { success: true, message: 'Successfully updated user.' };
        return response;
    }
}

export const deleteUserRequest = (userId: string) => {
    let users = getUsers();
    let userIndex = users.findIndex(x => x.id === userId);

    users.splice(userIndex, 1);
    localStorage.setItem('users', JSON.stringify(users));

    let tasks = getTasks();
    let tasksToKeep = tasks.filter(x => x.userId !== userId);
    localStorage.setItem('tasks', JSON.stringify(tasksToKeep));
}