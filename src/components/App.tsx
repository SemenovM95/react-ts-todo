import { ReactElement, useState } from 'react'

import NewTaskForm from 'components/NewTaskForm/NewTaskForm.tsx'
import TaskList from 'components/TaskList/TaskList.tsx'
import Footer from 'components/Footer/Footer.tsx'
import type { Task } from 'components/TaskItem/TaskItem.d'

import './App.scss'

const defaultTodos = [
  {
    completed: true,
    description: 'Completed task',
    created: '17 seconds',
    editing: false,
    id: 1,
    timer: 1111,
  },
  {
    completed: false,
    description: 'Editing task',
    created: '27 days',
    editing: true,
    id: 2,
    timer: 1111,
  },
  {
    completed: false,
    description: 'Active task',
    created: '5 minutes',
    editing: false,
    id: 3,
    timer: 5,
  },
]

export default function App(): ReactElement {
  const [todos, setTodos] = useState<Task[]>(defaultTodos)
  const [displayedTodos, setDisplayedTodos] = useState<Task[]>(todos)

  return (
    <section className="todoapp">
      <NewTaskForm setTodos={setTodos} />
      <section className="main">
        <TaskList todos={displayedTodos} setTodos={setTodos} />
        <Footer todos={todos} setTodos={setTodos} setDisplayedTodos={setDisplayedTodos} />
      </section>
    </section>
  )
}
