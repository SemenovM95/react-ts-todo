import { useEffect, useState, ReactElement } from 'react'
import { formatDistanceToNow } from 'date-fns'

import type { TaskItemProps } from './TaskItem.d'

export default function TaskItem(props: TaskItemProps): ReactElement {
  const { todo, onCompleted, onDeleted, onTimerTick } = props
  const { description, timer, created, completed, id, editing } = todo
  const [timerId, setTimerId] = useState<number | null>(null)

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

  const handleDeleted = () => {
    onDeleted(id)
    stopTimer()
  }

  useEffect(() => {
    if (todo.timer === 0) stopTimer()
  }, [timer])
  useEffect(() => {
    return () => {
      if (timerId) stopTimer()
      console.log(`task ${id} unmounted`)
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
          <button type="button" className="icon icon-edit" aria-label="edit" />
          <button type="button" className="icon icon-destroy" aria-label="delete" onClick={handleDeleted} />
        </div>
      ) : (
        <input type="text" className="edit" defaultValue="Editing task" />
      )}
    </li>
  )
}
