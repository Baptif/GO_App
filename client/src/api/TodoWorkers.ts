import { ENDPOINT } from '../Const'
import { KeyedMutator } from 'swr';
import {Todo} from '../interfaces/Todo'

export const fetcherWorker = (url: string) => 
    fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

export const markTodoAsStateWorker = async (id: number, state: string, mutate: KeyedMutator<Todo[]>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/${state}`, {
      method: "PATCH",
    }).then((res) => res.json())

    mutate(updated)
}

export const createTodoWorker = async (values: {title: string, body: string}, mutate: KeyedMutator<Todo[]>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json())

    mutate(updated)
}

export const deleteAllTodosWorker = async (mutate: KeyedMutator<Todo[]>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())

    mutate(updated)
}

// export const getTodoWorker = async (id: number) => {
//     const todo: Todo = await fetch(`${ENDPOINT}/api/todos/${id}`, {
//       method: "GET",
//     }).then((res) => res.json())

//     return todo
// }