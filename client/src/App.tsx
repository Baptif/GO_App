import { Box, List, ActionIcon  } from '@mantine/core'
import useSWR from 'swr'
import AddTodo from './components/AddTodo'
import { FaCheck } from "react-icons/fa";
import { Toaster } from 'react-hot-toast';

export interface Todo {
  id: number
  title: string
  body: string
  done: boolean
}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json()) 

const App = () => {

  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcher)

  const markTodoAsState = async (id: number, state: string) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/${state}`, {
      method: "PATCH",
    }).then((res) => res.json())

    mutate(updated)
  }

  return (
    <Box
      style={{
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      }}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <List.Item 
              key={`todo_list_${todo.id}`}
              icon={
                todo.done ? (
                  <ActionIcon onClick={() => markTodoAsState(todo.id,"undone")} color="teal" size={24} radius="xl">
                    <FaCheck />
                  </ActionIcon >
                ) : (
                  <ActionIcon onClick={() => markTodoAsState(todo.id,"done")} color="gray" size={24} radius="xl">
                    <FaCheck />
                  </ActionIcon >
                )
              }
            >{todo.title}</List.Item>
          )
        })}
      </List>

      <AddTodo mutate={mutate}/>
      <Toaster />
    </Box>
    
  )
}

export default App
