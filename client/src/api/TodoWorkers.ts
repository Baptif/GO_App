import { ENDPOINT } from '../Const'

export const fetcherWorker = (url: string) => 
    fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

export const markTodoAsStateWorker = async (id: number, state: string) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/${state}`, {
      method: "PATCH",
    }).then((res) => res.json())

    return updated
}

export const createTodoWorker = async (values: {title: string, body: string}) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then((res) => res.json())

    return updated
}