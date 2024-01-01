import useSWR from 'swr'
import AddTodo from './components/AddTodo'
import ListItem from './components/ListItem'
import { Toaster } from 'react-hot-toast'
import { Todo } from './interfaces/Todo'
import { fetcherWorker } from './api/TodoWorkers'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, Skeleton, Text, List, Title, ScrollArea } from '@mantine/core'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react'
import ButtonThemeSwitcher from './components/ButtonThemeSwitcher'


const App = () => {

  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcherWorker)

  const [openedNavBar, handlerNavbar ] = useDisclosure()
  const [openedDetails, handlerDetails ] = useDisclosure()
  const [currentTodo, setCurrentTodo] = useState<Todo>()

  const toggleTaskDetails = (todo: Todo) => {
    if (currentTodo === undefined || currentTodo?.ID !== todo.ID) {
      setCurrentTodo(todo)
      if (!openedDetails) {
        handlerDetails.toggle()
      }
    } else {
      handlerDetails.toggle()
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !openedNavBar } }}
      aside={{ width: 450, breakpoint: 'md', collapsed: { desktop: !openedDetails, mobile: !openedDetails } }}
      padding="md"
      zIndex={100}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify='space-between'>
          <Group>
            <Burger opened={openedNavBar} onClick={handlerNavbar.toggle} hiddenFrom="sm" size="sm" />
            <Title order={4}>🔥 TODO APP 🔥</Title>
          </Group>
          <ButtonThemeSwitcher/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" zIndex={101}>
        <Text>Lists</Text>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Text mb={4}>En cours</Text>
        <ScrollArea h={250} type="auto">
          <List spacing="xs" size="sm" mb={12} center>
            {data?.filter(todo => !todo.done)
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
        <Text mt={12} mb={4}>Terminé</Text>
        <ScrollArea h={250} type="auto">
          <List spacing="xs" size="sm" mb={12} center>
            {data?.filter(todo => todo.done)
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
      </AppShell.Main>

      <AppShell.Aside p="md">
        {data?.filter(todo => todo.ID == currentTodo?.ID)
          .map(todo => (
            <TaskDetails 
              key={`todo_detail_${todo.ID}`} 
              todo={todo} 
              mutate={mutate} 
              closeDetails={handlerDetails.close}
            />
          ))
        }
      </AppShell.Aside>

      <AppShell.Footer p="sm">
        <AddTodo mutate={mutate}/>
      </AppShell.Footer>

      <Toaster />

    </AppShell>
  )
}

export default App
