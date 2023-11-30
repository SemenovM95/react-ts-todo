declare interface NewTaskFormProps {
  onAdd: (description: string) => void
}

declare interface NewTaskFormState {
  description: string
}

export { NewTaskFormProps, NewTaskFormState }
