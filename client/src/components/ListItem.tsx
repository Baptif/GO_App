import { List, ActionIcon, Text } from '@mantine/core'
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
                key={`todo_list_${todo.ID}`}
                icon={
                    todo.done ? (
                        <ActionIcon onClick={() => markTodoAsState(todo.ID,"undone")} color="green" size={24} radius="xl">
                            <FaCheck />
                        </ActionIcon >
                    ) : (
                        <ActionIcon onClick={() => markTodoAsState(todo.ID,"done")} color="gray" size={24} radius="xl">
                            <FaCheck />
                        </ActionIcon >
                    )
                }
            >
            <Text onClick={() => alert(todo.title)}>{todo.title}</Text>
            </List.Item>
        </>
    )
}

export default ListItem