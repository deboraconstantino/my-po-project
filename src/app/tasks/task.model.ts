export interface Task {
    id: string,
    name: string,
    description: string,
    category: string,
    start: string,
    end: string,
    status: string,
    done: boolean,
    user: string
}