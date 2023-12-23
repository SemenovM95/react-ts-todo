import { ReactElement } from 'react'

import TaskItem from 'components/TaskItem/TaskItem.tsx'

import type { TaskListProps } from './TaskList.d'

export default function TaskList(props: TaskListProps): ReactElement {
  const { todos, onTimerTick, onCompleted, onDeleted } = props
  const handleCompleted = (id: number) => {
    onCompleted(id)
  }

  const handleDeleted = (id: number) => {
    onDeleted(id)
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TaskItem
          todo={todo}
          key={todo.id}
          onCompleted={handleCompleted}
          onDeleted={handleDeleted}
          onTimerTick={onTimerTick}
        />
      ))}
    </ul>
  )
}
