import { Modal, Button, Text, Box, Group } from '@mantine/core'

type Props = {
    title: String,
    message: String,
    opened: boolean,
    onClose(): void,
    onConfirm(): void,
}

const ConfirmationModal = ({ title, message, opened, onClose, onConfirm }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title={<strong>{title}</strong>}>
        <Box>
            <Text mb={24}>{message}</Text>
            <Group>
                <Button variant="outline" color="red" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="filled" color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </Group>
        </Box>
    </Modal>
  )
}

export default ConfirmationModal
