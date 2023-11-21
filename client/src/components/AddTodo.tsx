import {useState} from 'react'
import {useForm} from '@mantine/form'
import { Button, Group, Modal } from '@mantine/core'

const AddTodo = () => { 
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        },
    })

    return (
        <>
        <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
            Text
        </Modal>
        <Group>
            <Button fullWidth mb={12} onClick={() => setOpen(true)}>ADD TODO</Button>
        </Group>
        </>
    )
}

export default AddTodo