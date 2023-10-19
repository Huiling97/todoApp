import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../store/todos-context";
import TodosOutput from "../components/TodosOutput/TodosOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { getDatePlusDays } from '../util/date';
import { getTodos } from '../util/http';

const DueSoonTodos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const todosCtx = useContext(TodosContext);

  useEffect(() => {
    const retrieveTodos = async () => {
      try {
        const todos = await getTodos();
        todosCtx.setTodos(todos);
      } catch (e) {
        setError('Error fetching todo')
      }
      setIsLoading(false);
    }

    retrieveTodos();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  if (error && !isLoading) {
    return (
      <ErrorOverlay message={error} onConfirm={errorHandler} />
    )
  }

  if (isLoading) {
    return (
      <LoadingOverlay />
    )
  }

  const dueSoonTodos = todosCtx.todos.filter((todo) => {
    const today = new Date();
    const dateIn7Days = getDatePlusDays(today, 7);
  
    return (todo.date >= today) && (todo.date <= dateIn7Days)
  })

  return (
    <TodosOutput 
      todos={dueSoonTodos} 
      todoPeriod="Due in 7 Days" 
      fallbackText="No todos due for the next 7 days" 
    />
  )
}

export default DueSoonTodos;
