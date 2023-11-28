import { Box, List  } from '@mantine/core'
import useSWR from 'swr'
import AddTodo from './components/AddTodo'
import ListItem from './components/ListItem'
import { Toaster } from 'react-hot-toast'
import { Todo } from './interfaces/Todo'
import { fetcherWorker } from './api/TodoWorkers'


const App = () => {

  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcherWorker)

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
            <ListItem todo={todo} mutate={mutate}/>
          )
        })}
      </List>

      <AddTodo mutate={mutate}/>
      <Toaster />
    </Box>
    
  )
}

export default App
