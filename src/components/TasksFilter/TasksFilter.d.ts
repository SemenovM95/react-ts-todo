import type { Filter } from 'components/App'

declare interface TasksFilterProps {
  onSetFilter: (filter: Filter) => void
  currentFilter: Filter
}

export { TasksFilterProps, Filter }
