import { User } from '../../interfaces/User';
import { RegisterResponse } from '../../interfaces/auth/RegisterResponse';

export const registerRequest = (user: User) => {
    let usersString = localStorage.getItem('users');
    let users: User[] = [];
    let response: RegisterResponse = { success: false, message: 'A user with these credentials already exists.' };

    if (usersString) {
        users = JSON.parse(usersString);
    }
    if (users.find(x => x === user)) {
        return response;
    }
    else {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        response.message = "You registered successfully.";
        response.success = true;
        return response;
    }
}

export const loginRequest = (username: string, password: string) => {
    let usersString = localStorage.getItem('users');
    let users: User[] = [];

    if (usersString) {
        users = JSON.parse(usersString);
    }

    if (users.length > 0) {
        let currentUser = users.find(x => x.username === username && x.password === password);

        if (currentUser !== null) {
            return true;
        }
        else {
            return false;
        }
    }

    return false;
}