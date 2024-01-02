import useSWR from 'swr'
import AddTodo from './components/AddTodo'
import { Toaster } from 'react-hot-toast'
import { Todo } from './interfaces/Todo'
import { fetcherWorker } from './api/TodoWorkers'
import { useDisclosure } from '@mantine/hooks'
import { Accordion, AppShell, Burger, Group, Skeleton, Text, Title } from '@mantine/core'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react'
import ButtonThemeSwitcher from './components/Buttons/ButtonThemeSwitcher'
import ListOfTodos from './components/List'


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
        <Accordion multiple variant="separated" radius="md">

          <Accordion.Item value="listDoing">
            <Accordion.Control icon={'🚀'}>Doing</Accordion.Control>
            <Accordion.Panel>
              <ListOfTodos 
                data={data}
                filter={"!todo.done"}
                mutate={mutate} 
                toggleTaskDetails={toggleTaskDetails}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="listFinish">
            <Accordion.Control icon={'🤩'}>Finish</Accordion.Control>
            <Accordion.Panel>
              <ListOfTodos 
                data={data}
                filter={"todo.done"}
                mutate={mutate} 
                toggleTaskDetails={toggleTaskDetails}
              />
            </Accordion.Panel>
          </Accordion.Item>

        </Accordion>
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
