import { ReactElement, useCallback, useEffect, useState } from 'react'

import type { TasksFilterProps, Filter } from './TasksFilter.d'

export default function TasksFilter({ todos, setDisplayedTodos }: TasksFilterProps): ReactElement {
  const filters: Filter[] = ['all', 'active', 'completed']
  const [currentFilter, setCurrentFilter] = useState<Filter>('all')

  const filterTodos = useCallback(
    (filter: Filter) => {
      const filtered = filter === 'all' ? todos : todos.filter((todo) => todo.completed === (filter === 'completed'))
      setDisplayedTodos(filtered)
    },
    [todos]
  )

  const onSetFilter = (filter: Filter) => {
    setCurrentFilter(filter)
    filterTodos(filter)
  }

  useEffect(() => {
    filterTodos(currentFilter)
  }, [todos])

  return (
    <ul className="filters">
      {filters.map((filter) => {
        const className = currentFilter === filter ? 'selected' : ''
        return (
          <li key={filter}>
            <button type="button" className={className} onClick={() => onSetFilter(filter)}>
              {filter[0].toUpperCase() + filter.slice(1)}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
