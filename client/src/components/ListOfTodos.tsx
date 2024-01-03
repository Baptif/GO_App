import { ScrollArea, Text, List } from "@mantine/core"
import ListItem from "./ListItem"
import { Todo } from "../interfaces/Todo"
import { KeyedMutator } from "swr"

type Props = {
    data: Todo[] | undefined,
    filter: string,
    height: string,
    mutate: KeyedMutator<Todo[]>,
    toggleTaskDetails(todo: Todo): void
}

const ListOfTodos = ({data,height,filter,mutate,toggleTaskDetails}: Props) => {
    const filteredData = data?.filter(todo => eval(filter)) || [];

    return (
        <>
            <ScrollArea h={height} type="auto">
            {filteredData.length === 0 ? (
                <Text>Nothing here...</Text>
            ) : (
                <List spacing="xs" size="sm" mb={12} center>
                    {filteredData.map(todo => {
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
            )}
            </ScrollArea>
        </>
    )
}

export default ListOfTodos