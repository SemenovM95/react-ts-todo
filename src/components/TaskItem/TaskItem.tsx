import { useEffect, useState, ReactElement, SyntheticEvent } from 'react'
import { formatDistanceToNow } from 'date-fns'

import type { TaskItemProps } from './TaskItem.d'

export default function TaskItem({
  todo,
  onCompleted,
  onDeleted,
  onTimerTick,
  onToggleEditing,
  onEditTask,
}: TaskItemProps): ReactElement {
  const { description, timer, created, completed, id, editing } = todo
  const [timerId, setTimerId] = useState<number | null>(null)
  const [newDescription, setNewDescription] = useState(description)
  const [newMin, setNewMin] = useState(Math.floor(Number(timer) / 60).toString())
  const [newSec, setNewSec] = useState(Math.floor(Number(timer) % 60).toString())

  const startTimer = () => {
    if (timerId || !todo.timer) return
    const newTimer = setInterval(() => {
      onTimerTick(todo.id)
    }, 1000)
    setTimerId(newTimer as unknown as number)
  }

  const stopTimer = () => {
    if (!timerId) return
    clearInterval(timerId)
    setTimerId(null)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`
    return `${minutes}:${seconds}`
  }

  const handleCompleted = () => {
    onCompleted(id)
    stopTimer()
  }

  const handleEditing = () => {
    onToggleEditing(id)
    if (timerId) stopTimer()
  }

  const handleDeleted = () => {
    onDeleted(id)
    stopTimer()
  }

  const onChangeSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!newDescription) return
    const newTimer = Number(newMin) * 60 + Number(newSec)
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Enter') {
      onEditTask(id, { description: newDescription, timer: newTimer })
    }
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Escape') {
      onToggleEditing(id)
    }
  }

  useEffect(() => {
    if (todo.timer === 0) stopTimer()
  }, [timer])
  useEffect(() => {
    return () => {
      if (timerId) stopTimer()
    }
  }, [])

  const createdTime = created instanceof Date ? formatDistanceToNow(created) : created

  const className = `item ${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`

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
                <span className="timer-value">{formatTime(timer)}</span>
              </span>
            )}
            <span className="description">created {createdTime} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={handleEditing} />
          <button type="button" className="icon icon-destroy" aria-label="delete" onClick={handleDeleted} />
        </div>
      ) : (
        <>
          <input
            type="text"
            className="edit"
            placeholder="What needs to be done?"
            value={newDescription}
            onChange={editing && ((event) => setNewDescription(event.target?.value))}
            onKeyDown={onChangeSubmit}
            onBlur={onChangeSubmit}
            autoFocus
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            value={newMin}
            onChange={editing && ((event) => setNewMin(event.target?.value))}
            onKeyDown={onChangeSubmit}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={newSec}
            onChange={editing && ((event) => setNewSec(event.target?.value))}
            onKeyDown={onChangeSubmit}
          />
        </>
      )}
    </li>
  )
}
