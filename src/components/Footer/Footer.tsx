import type { FooterProps } from 'components/Footer/Footer.d'
import TasksFilter from 'components/TasksFilter/TasksFilter.tsx'

export default function Footer({ onSetFilter, currentFilter, itemsLeft, onClearCompleted }: FooterProps) {
  // NOTE: Абсолюно лишний в иерархии компонент, порождающий пропдриллинг, но по заданию он должен быть, так что...
  const setFilter = (filter: 'all' | 'active' | 'completed') => onSetFilter(filter)
  const clearCompleted = () => {
    onClearCompleted()
  }

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter onSetFilter={setFilter} currentFilter={currentFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
