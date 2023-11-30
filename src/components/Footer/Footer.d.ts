declare interface FooterProps {
  onSetFilter: (filter: 'all' | 'active' | 'completed') => void
  currentFilter: 'all' | 'active' | 'completed'
  onClearCompleted: () => void
  itemsLeft: number
}

export { FooterProps }
