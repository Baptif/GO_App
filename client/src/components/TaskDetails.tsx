import { Text, Title, CloseButton, Box, Group, ActionIcon } from '@mantine/core'
import { Todo } from '../interfaces/Todo'
import { FaPencilAlt, FaCheck, FaTrashAlt   } from "react-icons/fa"

type Props = {
    todo: Todo | undefined,
    closeDetails(): void
}

const TaskDetails = ({todo,closeDetails}: Props) => {
    const doneColor = todo?.done ? 'green' : 'gray'
    return (
        <>
            {todo != undefined &&
                <Box>
                    <Group mb={10}>
                        <CloseButton onClick={() => closeDetails()}/>
                        <ActionIcon color={doneColor}>
                            <FaCheck />
                        </ActionIcon>
                        <ActionIcon>
                            <FaPencilAlt />
                        </ActionIcon>
                        <ActionIcon color='red'>
                            <FaTrashAlt  />
                        </ActionIcon>
                    </Group>
                    <Title order={2} style={{wordWrap: 'break-word'}} mb={2}>{todo.title}</Title>
                    <Text style={{wordWrap: 'break-word'}}>{todo.body}</Text>
                </Box>
            }
        </>
    )
}

export default TaskDetails