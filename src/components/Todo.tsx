import {TodoId, type Todo as TodoType} from "../types";
import { useState } from "react";

interface Props extends TodoType {
    onRemoveTodo: ({id}: TodoId) => void
    onToggleCompleteTodo: ({id, completed} : Pick<TodoType, "id" | "completed">) => void,
    onEditTodo: ({id, title} : Pick<TodoType, "id" | "title">) => void,
}


export const Todo: React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleteTodo, onEditTodo}) => {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(title)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onEditTodo({id, title: inputValue});
        setEditMode(false);
    }

    return (
        <div className="view">
        <input
            className="toggle"
            checked={completed}
            type="checkbox"
            onChange={(e) => onToggleCompleteTodo({id, completed: e.target.checked })}
        />
        {!editMode && (
            <label onClick={() => setEditMode(prev => !prev)}>
                {title}
            </label>
        )}
        {editMode && (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
            </form>
        )}
        
        <button 
            className="destroy"
            onClick={() => onRemoveTodo({id})}
        />
    </div>
    )
}