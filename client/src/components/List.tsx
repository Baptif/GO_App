import { ScrollArea, Text, List } from "@mantine/core"
import ListItem from "./ListItem"
import { Todo } from "../interfaces/Todo"
import { KeyedMutator } from "swr"

type Props = {
    data: Todo[] | undefined,
    filter: string,
    mutate: KeyedMutator<Todo[]>,
    toggleTaskDetails(todo: Todo): void
}

const ListOfTodos = ({data,filter,mutate,toggleTaskDetails}: Props) => {
    
    return (
        <>
            <ScrollArea h={235} type="auto">
                <List spacing="xs" size="sm" mb={12} center>
                    {data?.filter(todo => eval(filter))
                    .map(todo => {
                    return (
                        <ListItem 
                            key={`todo_item_${todo.ID}`} 
                            todo={todo} 
                            mutate={mutate} 
                            toggleDetails={toggleTaskDetails}
                        />
                    )
                    })}
                </List>
            </ScrollArea>
        </>
    )
}

export default ListOfTodos