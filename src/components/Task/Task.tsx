import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import type { TaskProps, TaskState } from './Task.d'

export default class Task extends Component<TaskProps, TaskState> {
  handleCompleted = () => {
    const { onCompleted, todo } = this.props
    onCompleted(todo.id)
  }

  handleDeleted = () => {
    const { onDeleted, todo } = this.props
    onDeleted(todo.id)
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { description, created, completed, editing } = this.props.todo
    let className = ''
    if (completed) className += ' completed'
    if (editing) className += ' editing'

    const createdTime = created instanceof Date ? formatDistanceToNow(created) : created

    return (
      <li className={className}>
        {!editing ? (
          <div className="view">
            <input className="toggle" type="checkbox" checked={completed} onChange={this.handleCompleted} />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <span className="description">{description}</span>
              <span className="created">created {createdTime} ago</span>
            </label>
            <button type="button" className="icon icon-edit" aria-label="edit" />
            <button type="button" className="icon icon-destroy" aria-label="delete" onClick={this.handleDeleted} />
          </div>
        ) : (
          <input type="text" className="edit" defaultValue="Editing task" />
        )}
      </li>
    )
  }
}
