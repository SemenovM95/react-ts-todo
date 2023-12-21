import { Component } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import type { NewTaskFormProps, NewTaskFormState } from './NewTaskForm.d'

export default class NewTaskForm extends Component<NewTaskFormProps, NewTaskFormState> {
  constructor(props: NewTaskFormProps) {
    super(props)
    this.state = {
      description: '',
      min: '',
      sec: '',
    }
  }

  onDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  onMinInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ min: event.target.value })
  }

  onSecInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ sec: event.target.value })
  }

  onSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!this.state.description) return
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Enter') {
      const { onAdd } = this.props
      const { description, min, sec } = this.state
      onAdd({ description, min, sec })
      this.setState({ description: '', min: '', sec: '' })
    }
  }

  render() {
    const {
      state: { description, min, sec },
      onDescriptionInput,
      onMinInput,
      onSecInput,
      onSubmit,
    } = this
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
}
