import { FilterValue } from "../types";
import { Filters } from "./Filters"

interface Props {
    activeCount: number;
    onClearCompleted: () => void;
    completedCount: number;
    filterSelected: FilterValue;
    handleFilterChange: (filter: FilterValue) => void
}
export const Footer: React.FC<Props> = ({
    onClearCompleted,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    activeCount = 0,
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> tareas pendientes
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange} 
            />

            {completedCount > 0 && (
                <button
                    className="clear-completed"
                    onClick={onClearCompleted}>
                        Borrar Completadas
                </button>
            )}
        </footer>

      
    )
}