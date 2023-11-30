import { Component } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import type { NewTaskFormProps, NewTaskFormState } from './NewTaskForm.d'

export default class NewTaskForm extends Component<NewTaskFormProps, NewTaskFormState> {
  constructor(props: NewTaskFormProps) {
    super(props)
    this.state = {
      description: '',
    }
  }

  onInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  onSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Enter') {
      const { onAdd } = this.props
      const { description } = this.state
      onAdd(description)
      this.setState({ description: '' })
    }
  }

  render() {
    const { description } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          value={description}
          placeholder="What needs to be done?"
          onChange={this.onInput}
          onKeyDown={this.onSubmit}
        />
      </header>
    )
  }
}
