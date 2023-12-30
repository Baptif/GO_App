import { ENDPOINT } from '../Const'
import { KeyedMutator } from 'swr';
import {Todo} from '../interfaces/Todo'

export const fetcherWorker = (url: string) => 
    fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

export const markTodoAsStateWorker = async (todo: Todo, mutate: KeyedMutator<Todo[]>) => {
    const todoState = todo.done ? "undone" : "done"
    const updated = await fetch(`${ENDPOINT}/api/todos/${todo.ID}/${todoState}`, {
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

export const updateTodoWorker = async (id: number, values: {title: string, body: string}, mutate: KeyedMutator<Todo[]>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}`, {
        method: "PATCH",
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
    }).then((res) => res.json())

    mutate(updated)
}

export const deleteOneTodoWorker = async (id: number, mutate: KeyedMutator<Todo[]>) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: "DELETE",
    }).then((res) => res.json())

    mutate(updated)
}