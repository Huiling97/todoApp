import { useContext } from "react";
import TodosOutput from "../components/TodosOutput/TodosOutput";
import { TodosContext } from "../store/todos-context";

const AllTodos = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <TodosOutput 
      todos={todosCtx.todos} 
      todosPeriod="Total" 
      fallbackText="No toods found"  
    />
  )
}

export default AllTodos;
