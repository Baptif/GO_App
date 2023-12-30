import { useDisclosure } from '@mantine/hooks'
import { useForm, isNotEmpty, hasLength } from '@mantine/form'
import { Button, Group, Modal, TextInput, Textarea, Box } from '@mantine/core'
import { Todo } from '../interfaces/Todo'
import { KeyedMutator } from 'swr'
import toast from 'react-hot-toast'
import { createTodoWorker, deleteAllTodosWorker } from '../api/TodoWorkers'
import { useMantineColorScheme } from '@mantine/core'

type Props = {
    mutate: KeyedMutator<Todo[]>
}

const AddTodo = ({mutate} : Props) => { 
    const [opened, { open, close }] = useDisclosure(false)
    const { colorScheme } = useMantineColorScheme()
    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
        validate: {
            title: hasLength({ min: 1, max: 100 }, 'Title must be 1-100 characters long'),
            body: isNotEmpty("Enter your task content"),
        },
    })

    const createTodo = async (values: {title: string, body: string}) => {
        await createTodoWorker(values, mutate)
        close()
        form.reset()
        toast.success(`Successfully created ${values.title} !`, {
            duration: 2500,
            style: {
                background: colorScheme === 'dark' ? "#1F1F1F" : "",
                color: colorScheme === 'dark' ? "#fff" : "",
            }
        });
    }

    return (
        <>
        <Modal 
            size="lg" 
            opened={opened}
            onClose={() => {
                close()
                form.reset()
            }} 
            title="✏️ Create todo ✏️"
        >
            <Box component="form" onSubmit={form.onSubmit(createTodo)}>
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
                <Button type="submit">Create TODO</Button>
            </Box>
        </Modal>
        <Group justify="center">
            <Button style={{width:'50rem'}} mb={12} onClick={() => open()}>CREATE TODO</Button>
            <Button color="red" mb={12} onClick={() => deleteAllTodosWorker(mutate)} >DELETE ALL TODOS</Button>
        </Group>
        </>
    )
}

export default AddTodo