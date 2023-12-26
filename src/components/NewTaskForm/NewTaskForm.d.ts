import { Dispatch, SetStateAction } from 'react'
import { Task } from 'components/TaskItem/TaskItem'

declare interface NewTaskFormProps {
  setTodos: Dispatch<SetStateAction<Task[]>>
}

declare interface NewTaskFormState {
  description: string
  min: string
  sec: string
}

export { NewTaskFormProps, NewTaskFormState }
