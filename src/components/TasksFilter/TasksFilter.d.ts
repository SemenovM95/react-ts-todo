import type { Filter } from 'src/App.d'

declare interface TasksFilterProps {
  onSetFilter: (filter: Filter) => void
  currentFilter: Filter
}

export { TasksFilterProps, Filter }
