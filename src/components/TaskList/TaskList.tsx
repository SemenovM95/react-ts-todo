import { Component } from 'react'

import TaskItem from 'components/Task/TaskItem.tsx'

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
    const {
      props: { todos, onTimerTick },
      handleCompleted,
      handleDeleted,
    } = this
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <TaskItem
            todo={todo}
            key={todo.id}
            onCompleted={handleCompleted}
            onDeleted={handleDeleted}
            onTimerTick={onTimerTick}
          />
        ))}
      </ul>
    )
  }
}
