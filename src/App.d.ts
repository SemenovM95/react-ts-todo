declare interface AppState {
  todos: Todo[]
  filter: Filter
}

declare type Filter = 'all' | 'active' | 'completed'

export { AppState, Filter }
