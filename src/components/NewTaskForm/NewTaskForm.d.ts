declare interface NewTaskFormProps {
  onAdd: ({ description: string, min: string, sec: string }) => void
}

declare interface NewTaskFormState {
  description: string
  min: string
  sec: string
}

export { NewTaskFormProps, NewTaskFormState }
