import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import type { TaskItemProps, TaskItemState } from './TaskItem.d'

const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`
  return `${minutes}:${seconds}`
}

export default class TaskItem extends Component<TaskItemProps, TaskItemState> {
  constructor(props: TaskItemProps) {
    super(props)
    this.state = {
      timerId: null,
    }
  }

  componentDidUpdate() {
    const { todo } = this.props
    if (todo.timer === 0) this.stopTimer()
  }

  componentWillUnmount() {
    const { timerId } = this.state
    if (timerId) this.stopTimer()
  }

  handleCompleted = () => {
    const { onCompleted, todo } = this.props
    onCompleted(todo.id)
    this.stopTimer()
  }

  handleDeleted = () => {
    const { onDeleted, todo } = this.props
    onDeleted(todo.id)
    this.stopTimer()
  }

  startTimer = () => {
    const { timerId } = this.state
    const { onTimerTick, todo } = this.props
    if (timerId || !todo.timer) return
    const newTimer = setInterval(() => {
      onTimerTick(todo.id)
    }, 1000)
    this.setState({ timerId: newTimer })
  }

  stopTimer = () => {
    const { timerId } = this.state
    if (!timerId) return
    clearInterval(timerId)
    this.setState({ timerId: null })
  }

  render() {
    const {
      props: {
        todo: { description, created, completed, editing, timer },
      },
      handleCompleted,
      handleDeleted,
      startTimer,
      stopTimer,
    } = this
    let className = ''
    if (completed) className += ' completed'
    if (editing) className += ' editing'

    const createdTime = created instanceof Date ? formatDistanceToNow(created) : created

    return (
      <li className={className}>
        {!editing ? (
          <div className="view">
            <input className="toggle" type="checkbox" checked={completed} onChange={handleCompleted} />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <span className="title">{description}</span>
              {timer !== null && timer !== undefined && (
                <span className="description">
                  <button
                    className="icon icon-play"
                    type="button"
                    aria-label="start timer"
                    onClick={startTimer}
                    disabled={completed}
                  />
                  <button
                    className="icon icon-pause"
                    type="button"
                    aria-label="pause timer"
                    onClick={stopTimer}
                    disabled={completed}
                  />
                  <span className="timer-value">{formatTimer(timer)}</span>
                </span>
              )}
              <span className="description">created {createdTime} ago</span>
            </label>
            <button type="button" className="icon icon-edit" aria-label="edit" />
            <button type="button" className="icon icon-destroy" aria-label="delete" onClick={handleDeleted} />
          </div>
        ) : (
          <input type="text" className="edit" defaultValue="Editing task" />
        )}
      </li>
    )
  }
}
