import { useState, useEffect } from 'react'
import { Todos } from './components/Todos'
import { FilterValue, TodoId, type Todo as TodoType } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { type TodoTitle} from './types'

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  
  useEffect(() => {
    if(todos.length < 0) return;
        localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if(storedTodos){
        const todos = storedTodos !== null ? JSON.parse(storedTodos) : null
        setTodos(todos);
    }
  },[])

  const filterTodos = todos.filter(todo => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }

  const handleCompleted = 
    ({id, completed} : Pick<TodoType, "id" | "completed">
    ) : void => {
        const newTodos = todos.map(todo => {
            if(todo.id === id){
                return {
                    ...todo,
                    completed
                }
            }
            return todo
        });
        setTodos(newTodos);
    }

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    const handleRemoveAllCompleted = (): void => {
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos)
    }

    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - activeCount

    const handleAddTodo = ({title}: TodoTitle): void => {
        const newTodo = {
            title,
            id: crypto.randomUUID(),
            completed: false,
        }

        const newTodos = [...todos, newTodo];
        setTodos(newTodos)
    }

    const handleEditTodo = ({id, title} : Pick<TodoType, "id" | "title">): void => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if(todoIndex !== -1){
            const updateTodos = [...todos];
            updateTodos[todoIndex].title = title;
            setTodos(updateTodos)
        }
    }

  return (
    <div className='todoapp'>
        <Header onAddTodo={handleAddTodo}/>
        <Todos 
            todos={filterTodos}
            onRemoveTodo={handleRemove} 
            onToggleCompleteTodo={handleCompleted}
            onEditTodo={handleEditTodo}
        />
        <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={handleRemoveAllCompleted}
            filterSelected={filterSelected}
            handleFilterChange={handleFilterChange}
        />
    </div>
  )
}

export default App
