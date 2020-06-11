import { TaskStatus } from "../enums/TaskStatus";

export interface Task {
    id: string,
    userId: string,
    title: string,
    description: string,
    estimation: number,
    status: TaskStatus
}