import { Text, Title, CloseButton, Box, Group, ActionIcon, TextInput, Textarea, Button } from '@mantine/core'
import { Todo } from '../interfaces/Todo'
import { FaPencilAlt   } from "react-icons/fa"
import ButtonCheckTodo from './ButtonCheckTodo'
import ButtonDeleteTodo from './ButtonDeleteTodo'
import { KeyedMutator } from 'swr'
import { useDisclosure } from '@mantine/hooks'
import { hasLength, isNotEmpty, useForm } from '@mantine/form'
import { updateTodoWorker } from '../api/TodoWorkers'
import toast from 'react-hot-toast'
import { useMantineColorScheme } from '@mantine/core'

type Props = {
    todo: Todo,
    closeDetails(): void,
    mutate: KeyedMutator<Todo[]>,
}

const TaskDetails = ({todo,mutate,closeDetails}: Props) => {
    const [opened, handlerUpdateForm ] = useDisclosure(false)
    const { colorScheme } = useMantineColorScheme()
    const form = useForm({
        initialValues: {
            title: todo.title,
            body: todo.body,
        },
        validate: {
            title: hasLength({ min: 1, max: 100 }, 'TODO title must be 1-100 characters long'),
            body: isNotEmpty("Enter your TODO content"),
        },
    })

    const updateTodo = async (values: {title: string, body: string}) => {
        await updateTodoWorker(todo.ID, values, mutate)
        handlerUpdateForm.close()
        toast.success(`Successfully updated ${values.title} !`, {
            duration: 2500,
            style: {
                background: colorScheme === 'dark' ? "#1F1F1F" : "",
                color: colorScheme === 'dark' ? "#fff" : "",
            }
        });
    }

    return (
        <>
        <Box>
            <Group mb={10}>
                <CloseButton onClick={() => closeDetails()}/>
                <ButtonCheckTodo todo={todo} mutate={mutate} size={28} radius="sm"/>
                <ActionIcon onClick={() => handlerUpdateForm.toggle()}>
                    <FaPencilAlt />
                </ActionIcon>
                <ButtonDeleteTodo todo={todo} mutate={mutate} closeDetails={closeDetails} size={28} radius="sm"/>
            </Group>
            {opened ? (
                <Box component="form" onSubmit={form.onSubmit(updateTodo)}>
                    <TextInput
                        mb={12}
                        label="Task"
                        placeholder="What do you need to do ?"
                        withAsterisk
                        {...form.getInputProps("title")}
                    />
                    <Textarea
                        mb={12}
                        label="Content"
                        placeholder="Tell me more about it.."
                        withAsterisk
                        {...form.getInputProps("body")}
                    />
                    <Button type="submit">Update TODO</Button>
                </Box>
            ) : (
                <Box>
                    <Title order={2} style={{wordWrap: 'break-word'}} mb={2}>{todo.title}</Title>
                    <Text style={{wordWrap: 'break-word'}}>{todo.body}</Text>
                </Box>
            )}
        </Box>
        </>
    )
}

export default TaskDetails