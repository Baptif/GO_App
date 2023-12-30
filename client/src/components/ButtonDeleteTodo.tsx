import { ActionIcon, MantineRadius } from "@mantine/core"
import { FaTrashAlt } from "react-icons/fa"
import {Todo} from '../interfaces/Todo'
import { KeyedMutator } from "swr"
import ConfirmationModal from './ConfirmationModal'
import { useDisclosure } from '@mantine/hooks'
import { deleteOneTodoWorker } from '../api/TodoWorkers'

type Props = {
    todo: Todo,
    radius: MantineRadius,
    size: number
    mutate: KeyedMutator<Todo[]>,
}

const ButtonDeletekTodo = ({todo,radius,size,mutate}: Props) => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <ConfirmationModal
                opened={opened}
                onClose={close}
                onConfirm={() => deleteOneTodoWorker(todo.ID,mutate)}
                title={"TODO : "+todo.title}
                message='You are going to delete this todo, do you want to continue ?'
            />
            <ActionIcon onClick={open} color='red' size={size} radius={radius}>
                <FaTrashAlt />
            </ActionIcon >
        </>
    )
}

export default ButtonDeletekTodo