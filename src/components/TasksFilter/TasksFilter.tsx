import { ReactElement } from 'react'

import type { TasksFilterProps, Filter } from './TasksFilter.d'

export default function TasksFilter(props: TasksFilterProps): ReactElement {
  const filters: Filter[] = ['all', 'active', 'completed']
  const { currentFilter, onSetFilter } = props

  const setFilter = (filter: Filter) => onSetFilter(filter)

  return (
    <ul className="filters">
      {filters.map((filter) => {
        const className = currentFilter === filter ? 'selected' : ''
        return (
          <li key={filter}>
            <button type="button" className={className} onClick={() => setFilter(filter)}>
              {filter[0].toUpperCase() + filter.slice(1)}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
