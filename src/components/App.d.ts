import type Task from 'components/Task/TaskItem.d'

declare interface AppState {
  todos: Task[]
  filter: Filter
}

declare type Filter = 'all' | 'active' | 'completed'

export { AppState, Filter }
