import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import type { NewTaskFormProps } from './NewTaskForm.d'

export default function NewTaskForm({ setTodos }: NewTaskFormProps) {
  const [description, setDescription] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const resetFormData = () => {
    setDescription('')
    setMin('')
    setSec('')
  }

  const onDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const onMinInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMin(event.target.value)
  }

  const onSecInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSec(event.target.value)
  }

  const addTodo = () => {
    const timer = min || sec ? Number(min || 0) * 60 + Number(sec || 0) : null
    setTodos((prev) => {
      const id = prev.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1
      const newTodo = { completed: false, description, created: 'now', editing: false, id, timer }
      return prev.concat(newTodo)
    })
  }

  const onSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!description) return
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Enter') {
      addTodo()
      resetFormData()
    }
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Escape') {
      resetFormData()
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        className="new-todo"
        value={description}
        placeholder="What needs to be done?"
        onChange={onDescriptionInput}
        onKeyDown={onSubmit}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinInput}
        onKeyDown={onSubmit}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecInput}
        onKeyDown={onSubmit}
      />
    </header>
  )
}
