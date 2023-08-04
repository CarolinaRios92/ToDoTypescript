import { TodoId, type ListOfTodos, type Todo as TodoType} from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onRemoveTodo: ({id}:TodoId) => void
    onToggleCompleteTodo: ({id, completed} : Pick<TodoType, "id" | "completed">) => void,
    onEditTodo: ({id, title} : Pick<TodoType, "id" | "title">) => void,
}

export const Todos: React.FC<Props> = ({ todos , onRemoveTodo, onToggleCompleteTodo, onEditTodo}) => {
    return (
        <ul className="todo-list">
            {todos.map((todo, index )=> (
                <li 
                    key={index} 
                    className={`${todo.completed ? "completed" : ""}`}>
                    <Todo
                        key={index}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                        onToggleCompleteTodo={onToggleCompleteTodo}
                    />
                </li>
            ))}
        </ul>
    )
}
