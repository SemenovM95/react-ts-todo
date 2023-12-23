import { ReactElement, useState } from 'react'

import NewTaskForm from 'components/NewTaskForm/NewTaskForm.tsx'
import TaskList from 'components/TaskList/TaskList.tsx'
import Footer from 'components/Footer/Footer.tsx'
import type { Task } from 'components/TaskItem/TaskItem.d'

import type { Filter } from './App.d'

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
  const [filter, setFilter] = useState<Filter>('all')

  const displayedTodos = () => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }

  const addTodo = ({ description, min, sec }: { description: string; min: string; sec: string }) => {
    const timer = min || sec ? Number(min || 0) * 60 + Number(sec || 0) : null
    setTodos((prev) => {
      const id = prev.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1
      const newTodo = { completed: false, description, created: 'now', editing: false, id, timer }
      return prev.concat(newTodo)
    })
  }

  const handleCompleted = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleDeleted = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const onSetFilter = (newFilter: Filter) => {
    setFilter(newFilter)
  }

  const countUnfinished = (): number => {
    return todos.filter((todo) => !todo.completed).length
  }

  const tickTimer = (id: number) => {
    const found = todos.findIndex((todo) => todo.id === id)
    if (found !== -1) {
      setTodos((prev) => {
        const newState = prev.slice()
        const todo = newState[found]
        newState[found] = {
          ...todo,
          timer: (todo.timer as number) - 1,
        }
        return newState
      })
    }
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addTodo} />
      <section className="main">
        <TaskList
          todos={displayedTodos()}
          onCompleted={handleCompleted}
          onDeleted={handleDeleted}
          onTimerTick={tickTimer}
        />
        <Footer
          currentFilter={filter}
          itemsLeft={countUnfinished()}
          onClearCompleted={clearCompleted}
          onSetFilter={onSetFilter}
        />
      </section>
    </section>
  )
}
