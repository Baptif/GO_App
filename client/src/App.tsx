import useSWR from 'swr'
import AddTodo from './components/AddTodo'
import ListItem from './components/ListItem'
import { Toaster } from 'react-hot-toast'
import { Todo } from './interfaces/Todo'
import { fetcherWorker } from './api/TodoWorkers'
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton, Text, List } from '@mantine/core';


const App = () => {

  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcherWorker)
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 400, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>🔥 TODO APP 🔥</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text>Lists</Text>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <List spacing="xs" size="sm" mb={12} center>
          {data?.map((todo) => {
            return (
              <ListItem todo={todo} mutate={mutate}/>
            )
          })}
        </List>
      </AppShell.Main>
      <AppShell.Aside p="md">
        Details
      </AppShell.Aside>
      <AppShell.Footer p="sm">
        <AddTodo mutate={mutate}/>
      </AppShell.Footer>
      <Toaster />
    </AppShell>
  )
}

export default App
