import { ReactElement } from 'react'

import TaskItem from 'components/TaskItem/TaskItem.tsx'

import type { TaskListProps } from './TaskList.d'

export default function TaskList({ todos, setTodos }: TaskListProps): ReactElement {
  const handleCompleted = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const toggleEditing = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, editing: !todo.editing } : todo)))
  }

  const editTask = (id: number, { description, timer }: { description: string; timer: number }) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, description, timer, editing: false } : todo)))
  }

  const handleDeleted = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
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
    <ul className="todo-list">
      {todos.map((todo) => (
        <TaskItem
          todo={todo}
          key={todo.id}
          onCompleted={handleCompleted}
          onDeleted={handleDeleted}
          onToggleEditing={toggleEditing}
          onEditTask={editTask}
          onTimerTick={tickTimer}
        />
      ))}
    </ul>
  )
}
