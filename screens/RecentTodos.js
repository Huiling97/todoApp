import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../store/todos-context";
import TodosOutput from "../components/TodosOutput/TodosOutput";
import { getDateMinusDays } from '../util/date';
import { getTodos } from '../util/http';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentTodos = () => {
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

  const recentTodos = todosCtx.todos.filter((todo) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (todo.date > date7DaysAgo) && (todo.date <= today);
  })

  return (
    <TodosOutput 
      todos={recentTodos} 
      todoPeriod="Last 7 Days" 
      fallbackText="No todos added for the last 7 days" 
    />
  )
}

export default RecentTodos;
