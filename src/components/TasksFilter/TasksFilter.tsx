import { Component } from 'react'

import type { TasksFilterProps, Filter } from './TasksFilter.d'

export default class TasksFilter extends Component<TasksFilterProps> {
  filters: Filter[] = ['all', 'active', 'completed']

  setFilter = (filter: Filter) => {
    const { onSetFilter } = this.props
    onSetFilter(filter)
  }

  render() {
    return (
      <ul className="filters">
        {this.filters.map((filter) => {
          const { currentFilter } = this.props
          const className = currentFilter === filter ? 'selected' : ''
          return (
            <li key={filter}>
              <button
                type="button"
                className={className}
                onClick={() => {
                  this.setFilter(filter)
                }}
              >
                {filter[0].toUpperCase() + filter.slice(1)}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}
