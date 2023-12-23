import type Task from 'components/TaskItem/TaskItem.d'

declare interface AppState {
  todos: Task[]
  filter: Filter
}

declare type Filter = 'all' | 'active' | 'completed'

export { AppState, Filter }
