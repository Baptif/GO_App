import { List, ActionIcon } from '@mantine/core'
import {Todo} from '../interfaces/Todo'
import { FaCheck } from "react-icons/fa";
import { markTodoAsStateWorker } from '../api/TodoWorkers'
import { KeyedMutator } from 'swr';

type Props = {
    todo: Todo,
    mutate: KeyedMutator<Todo[]>
}

const ListItem = ({todo,mutate}: Props) => {
    const markTodoAsState = async (id: number, state: string) => {
        const updated = await markTodoAsStateWorker(id, state)
        mutate(updated)
    }

    return (
        <>
        <List.Item 
            key={`todo_list_${todo.id}`}
            icon={
                todo.done ? (
                    <ActionIcon onClick={() => markTodoAsState(todo.id,"undone")} color="teal" size={24} radius="xl">
                    <FaCheck />
                    </ActionIcon >
                ) : (
                    <ActionIcon onClick={() => markTodoAsState(todo.id,"done")} color="gray" size={24} radius="xl">
                    <FaCheck />
                    </ActionIcon >
                )
            }
        >{todo.title}</List.Item>
        </>
    )
}

export default ListItem