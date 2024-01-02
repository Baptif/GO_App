import { ActionIcon, MantineRadius, useMantineColorScheme } from "@mantine/core"
import { FaTrashAlt } from "react-icons/fa"
import {Todo} from '../../interfaces/Todo'
import { KeyedMutator } from "swr"
import ConfirmationModal from '../ConfirmationModal'
import { useDisclosure } from '@mantine/hooks'
import { deleteOneTodoWorker } from '../../api/TodoWorkers'
import toast from "react-hot-toast"

type Props = {
    todo: Todo,
    radius: MantineRadius,
    size: number,
    mutate: KeyedMutator<Todo[]>,
    closeDetails(): void
}

const ButtonDeletekTodo = ({todo,radius,size,mutate,closeDetails}: Props) => {
    const [opened, { open, close }] = useDisclosure(false)
    const { colorScheme } = useMantineColorScheme()

    return (
        <>
            <ConfirmationModal
                opened={opened}
                onClose={close}
                onConfirm={() => {
                    deleteOneTodoWorker(todo.ID,mutate)
                    closeDetails()
                    toast.success(`Successfully deleted ${todo.title} !`, {
                        icon: '👏',
                        duration: 2500,
                        style: {
                            background: colorScheme === 'dark' ? "#1F1F1F" : "",
                            color: colorScheme === 'dark' ? "#fff" : "",
                        }
                    });
                }}
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