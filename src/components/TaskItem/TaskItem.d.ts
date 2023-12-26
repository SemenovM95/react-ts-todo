interface Task {
  completed: boolean
  description: string
  created: string | Date
  editing: boolean
  id: number
  timer: number | null
}

interface TaskItemProps {
  todo: Task
  onCompleted: (id: number) => void
  onDeleted: (id: number) => void
  onToggleEditing: (id: number) => void
  onEditTask: (id: number, { description: string, timer: number }) => void
  onTimerTick: (id: number) => void
}

interface TaskItemState {
  timerId: NodeJS.Timeout | null
}

export { Task, TaskItemProps, TaskItemState }
