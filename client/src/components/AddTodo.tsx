import {useState} from 'react'
import {useForm} from '@mantine/form'
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core'
import {Todo} from '../interfaces/Todo'
import { KeyedMutator } from 'swr'
import toast from 'react-hot-toast'
import { createTodoWorker } from '../api/TodoWorkers'

type Props = {
    mutate: KeyedMutator<Todo[]>
}

const AddTodo = ({mutate} : Props) => { 
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        },
    })

    const createTodo = async (values: {title: string, body: string}) => {
        const updated = await createTodoWorker(values)
        mutate(updated)
        
        form.reset()
        setOpen(false)
        toast.success(`Successfully created ${values.title} !`, {duration: 2000});
    }

    return (
        <>
        <Modal opened={open} onClose={() => setOpen(false)} title="✏️ Create todo ✏️">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput
                    required
                    mb={12}
                    label="Task"
                    placeholder="What do you need to do ?"
                    {...form.getInputProps("title")}
                />
                <Textarea
                    required
                    mb={12}
                    label="Content"
                    placeholder="Tell me more about it.."
                    {...form.getInputProps("body")}
                />
                <Button type="submit">Create TODO</Button>
            </form>
        </Modal>
        <Group>
            <Button fullWidth mb={12} onClick={() => setOpen(true)}>CREATE TODO</Button>
        </Group>
        </>
    )
}

export default AddTodo