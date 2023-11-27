import {useState} from 'react'
import {useForm} from '@mantine/form'
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core'
import { ENDPOINT, Todo } from '../App'
import { KeyedMutator } from 'swr'
import toast from 'react-hot-toast';

const AddTodo = ({mutate} : {mutate: KeyedMutator<Todo[]>}) => { 
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        },
    })

    const createTodo = async (values: {title: string, body: string}) => {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => res.json())

        mutate(updated)
        form.reset()
        setOpen(false)
        toast.success(`Successfully created ${values.title} !`, {duration: 2500});
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