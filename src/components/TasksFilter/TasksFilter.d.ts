import type { Filter } from 'components/App'
import { Task } from 'components/TaskItem/TaskItem'
import { Dispatch, SetStateAction } from 'react'

declare interface TasksFilterProps {
  todos: Task[]
  setDisplayedTodos: Dispatch<SetStateAction<Task[]>>
}

export { TasksFilterProps, Filter }
