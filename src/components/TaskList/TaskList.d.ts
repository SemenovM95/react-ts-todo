import { Task } from 'components/TaskItem/TaskItem'

declare interface TaskListProps {
  todos: Task[]
  setTodos: (callback: (prev: Task[]) => Task[]) => void
  // onCompleted: (id: number) => void
  // onDeleted: (id: number) => void
  // onTimerTick: (id: number) => void
}

export { TaskListProps }
