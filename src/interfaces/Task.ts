import { TaskStatus } from "../enums/TaskStatus";

export interface Task {
    title: string,
    description: string,
    estimation: number,
    status: TaskStatus
}