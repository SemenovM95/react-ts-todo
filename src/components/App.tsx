import { Component, ComponentProps } from 'react'

import NewTaskForm from 'components/NewTaskForm/NewTaskForm.tsx'
import TaskList from 'components/TaskList/TaskList.tsx'
import Footer from 'components/Footer/Footer.tsx'

import type { AppState, Filter } from './App.d'
import './App.scss'

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
          timer: 1111,
        },
        {
          completed: false,
          description: 'Editing task',
          created: '27 days',
          editing: true,
          id: 2,
          timer: 1111,
        },
        {
          completed: false,
          description: 'Active task',
          created: '5 minutes',
          editing: false,
          id: 3,
          timer: 5,
        },
      ],
      filter: 'all',
    }
  }

  displayedTodos = () => {
    const { filter, todos } = this.state
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }

  addTodo = ({ description, min, sec }: { description: string; min: string; sec: string }) => {
    const { todos } = this.state
    const timer = min || sec ? Number(min || 0) * 60 + Number(sec || 0) : null
    this.setState({
      todos: [
        ...todos,
        {
          completed: false,
          description,
          timer,
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

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => !todo.completed),
    }))
  }

  setFilter = (filter: Filter) => {
    this.setState({ filter })
  }

  countUnfinished = (): number => {
    const { todos } = this.state
    return todos.filter((todo) => !todo.completed).length
  }

  tickTimer = (id: number) => {
    const { todos } = this.state
    const found = todos.findIndex((todo) => todo.id === id)
    if (found !== -1) {
      const todo = todos[found]
      this.setState((prev) => {
        const newState = prev.todos.slice()
        newState[found] = {
          ...todo,
          timer: todo.timer - 1,
        }
        return {
          todos: newState,
        }
      })
    }
  }

  render() {
    const {
      state: { filter },
      addTodo,
      displayedTodos,
      handleCompleted,
      handleDeleted,
      clearCompleted,
      setFilter,
      countUnfinished,
      tickTimer,
    } = this
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={addTodo} />
        <section className="main">
          <TaskList
            todos={displayedTodos()}
            onCompleted={handleCompleted}
            onDeleted={handleDeleted}
            onTimerTick={tickTimer}
          />
          <Footer
            currentFilter={filter}
            itemsLeft={countUnfinished()}
            onClearCompleted={clearCompleted}
            onSetFilter={setFilter}
          />
        </section>
      </section>
    )
  }
}
