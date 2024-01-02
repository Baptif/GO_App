import { List, Text } from '@mantine/core'
import {Todo} from '../interfaces/Todo'
import { KeyedMutator } from 'swr'
import ButtonCheckTodo from './Buttons/ButtonCheckTodo'

type Props = {
    todo: Todo,
    mutate: KeyedMutator<Todo[]>,
    toggleDetails(todo: Todo): void
}

const ListItem = ({todo,mutate,toggleDetails}: Props) => {
    return (
        <>
            <List.Item 
                icon={
                    <ButtonCheckTodo todo={todo} mutate={mutate} size={26} radius="lg"/>
                }
            >
            <Text onClick={() => toggleDetails(todo)} style={{cursor:'pointer'}}>{todo.title}</Text>
            </List.Item>
        </>
    )
}

export default ListItem