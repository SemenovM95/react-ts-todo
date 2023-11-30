import './App.css'
import { Component, ComponentProps } from 'react'

import NewTaskForm from 'components/NewTaskForm/NewTaskForm.tsx'
import Footer from 'components/Footer/Footer.tsx'
import TaskList from 'components/TaskList/TaskList.tsx'

import type { AppState } from './App.d'

export default class App extends Component<ComponentProps<any>, AppState> {
  constructor(props: ComponentProps<any>) {
    super(props)
    this.state = {
      todos: [
        {
          completed: true,
          description: 'Completed task',
          created: '17 seconds',
          editing: false,
          id: 1,
        },
        {
          completed: false,
          description: 'Editing task',
          created: '27 days',
          editing: true,
          id: 2,
        },
        {
          completed: false,
          description: 'Active task',
          created: '5 minutes',
          editing: false,
          id: 3,
        },
      ],
      filter: 'all',
    }
  }

  displayedTodos = () => {
    const { filter, todos } = this.state
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
    return todos
  }

  addTodo = (description: string) => {
    const { todos } = this.state
    this.setState({
      todos: [
        ...todos,
        {
          completed: false,
          description,
          created: new Date(),
          editing: false,
          id: Math.random() * 100,
        },
      ],
    })
  }

  handleCompleted = (id: number) => {
    const { todos } = this.state
    this.setState({ todos: todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)) })
  }

  handleDeleted = (id: number) => {
    const { todos } = this.state
    this.setState({ todos: todos.filter((todo) => todo.id !== id) })
  }

  setFilter = (filter: 'all' | 'active' | 'completed') => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => !todo.completed),
    }))
  }

  countUndone = (): number => {
    const { todos } = this.state
    return todos.filter((todo) => !todo.completed).length
  }

  render() {
    const { filter } = this.state
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addTodo} />
        <section className="main">
          <TaskList todos={this.displayedTodos()} onCompleted={this.handleCompleted} onDeleted={this.handleDeleted} />
          <Footer
            currentFilter={filter}
            itemsLeft={this.countUndone()}
            onClearCompleted={this.clearCompleted}
            onSetFilter={this.setFilter}
          />
        </section>
      </section>
    )
  }
}
