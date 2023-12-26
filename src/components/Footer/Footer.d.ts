import { Dispatch, SetStateAction } from 'react'
import { Task } from 'components/TaskItem/TaskItem'

declare interface FooterProps {
  todos: Task[]
  setTodos: Dispatch<SetStateAction<Task[]>>
  setDisplayedTodos: Dispatch<SetStateAction<Task[]>>
}

export { FooterProps }
