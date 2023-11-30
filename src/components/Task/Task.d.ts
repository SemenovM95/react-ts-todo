declare interface Task {
  description: string
  created: string | Date
  completed: boolean
  editing: boolean
  id: number
}

declare interface TaskProps {
  todo: Task
  onCompleted: (id: number) => void
  onDeleted: (id: number) => void
}

declare interface TaskState extends Task {
  updatedDescription?: string
}

export { Task, TaskProps, TaskState }
