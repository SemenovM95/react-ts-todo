declare interface TaskListProps {
  todos: Todo[]
  onCompleted: (id: number) => void
  onDeleted: (id: number) => void
}

export { TaskListProps }
