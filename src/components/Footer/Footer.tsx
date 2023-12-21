import type { Filter } from 'components/App.d'
import type { FooterProps } from 'components/Footer/Footer.d'
import TasksFilter from 'components/TasksFilter/TasksFilter.tsx'

// NOTE: Абсолюно лишний в иерархии компонент, порождающий пропдриллинг, но по заданию он должен быть, так что...
export default function Footer({ onSetFilter, currentFilter, itemsLeft, onClearCompleted }: FooterProps) {
  const setFilter = (filter: Filter) => onSetFilter(filter)
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
