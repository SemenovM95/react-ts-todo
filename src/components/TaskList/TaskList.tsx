import { Component } from 'react'

import Task from 'components/Task/Task.tsx'

import type { TaskListProps } from './TaskList.d'

export default class TaskList extends Component<TaskListProps> {
  handleCompleted = (id: number) => {
    const { onCompleted } = this.props
    onCompleted(id)
  }

  handleDeleted = (id: number) => {
    const { onDeleted } = this.props
    onDeleted(id)
  }

  render() {
    const { todos } = this.props
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task todo={todo} key={todo.id} onCompleted={this.handleCompleted} onDeleted={this.handleDeleted} />
        ))}
      </ul>
    )
  }
}
