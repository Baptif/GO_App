import { ActionIcon, MantineRadius } from "@mantine/core"
import { FaCheck } from "react-icons/fa"
import {Todo} from '../../interfaces/Todo'
import { markTodoAsStateWorker} from '../../api/TodoWorkers'
import { KeyedMutator } from "swr"

type Props = {
    todo: Todo,
    radius: MantineRadius,
    size: number
    mutate: KeyedMutator<Todo[]>,
}

const ButtonCheckTodo = ({todo,radius,size,mutate}: Props) => {
    const todoColor = todo.done ? "green" : "gray"
    return (
        <ActionIcon onClick={() => markTodoAsStateWorker(todo,mutate)} color={todoColor} size={size} radius={radius}>
            <FaCheck />
        </ActionIcon >
    )
}

export default ButtonCheckTodo