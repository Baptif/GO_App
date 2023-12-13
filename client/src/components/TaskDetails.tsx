import { Text } from '@mantine/core'
import { Todo } from '../interfaces/Todo'

type Props = {
    todo: Todo | undefined,
}

const TaskDetails = ({todo}: Props) => {

    return (
        <>
            {todo != undefined && <Text>{todo.body}</Text>}
        </>
    )
}

export default TaskDetails