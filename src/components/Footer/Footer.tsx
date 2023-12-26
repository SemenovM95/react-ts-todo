import { ReactElement } from 'react'

import type { FooterProps } from 'components/Footer/Footer.d'
import TasksFilter from 'components/TasksFilter/TasksFilter.tsx'

// NOTE: Абсолюно лишний в иерархии компонент, порождающий пропдриллинг, но по заданию он должен быть, так что...
export default function Footer({ todos, setTodos, setDisplayedTodos }: FooterProps): ReactElement {
  const clearCompleted = () => setTodos((prev) => prev.filter((todo) => !todo.completed))
  const countUnfinished = (): number => {
    return todos.filter((todo) => !todo.completed).length
  }

  return (
    <footer className="footer">
      <span className="todo-count">{countUnfinished()} items left</span>
      <TasksFilter todos={todos} setDisplayedTodos={setDisplayedTodos} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
