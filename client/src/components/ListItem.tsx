import { List, ActionIcon, Text } from '@mantine/core'
import {Todo} from '../interfaces/Todo'
import { FaCheck } from "react-icons/fa";
import { markTodoAsStateWorker} from '../api/TodoWorkers'
import { KeyedMutator } from 'swr';

type Props = {
    todo: Todo,
    mutate: KeyedMutator<Todo[]>,
    toggleDetails(todo: Todo): void
}

const ListItem = ({todo,mutate,toggleDetails}: Props) => {

    return (
        <>
            <List.Item 
                key={`todo_list_${todo.ID}`}
                icon={
                    todo.done ? (
                        <ActionIcon onClick={() => markTodoAsStateWorker(todo.ID,"undone",mutate)} color="green" size={24} radius="xl">
                            <FaCheck />
                        </ActionIcon >
                    ) : (
                        <ActionIcon onClick={() => markTodoAsStateWorker(todo.ID,"done",mutate)} color="gray" size={24} radius="xl">
                            <FaCheck />
                        </ActionIcon >
                    )
                }
            >
            <Text onClick={() => toggleDetails(todo)} style={{cursor:'pointer'}}>{todo.title}</Text>
            </List.Item>
        </>
    )
}

export default ListItem