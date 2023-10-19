import { createContext, useReducer } from "react";

export const TodosContext = createContext({
  todos: [],
  addTodo: ({ description, date }) => {},
  setTodos: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, { description, date }) => {}
});

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updateTodoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const updateTodo = state[updateTodoIndex];
      const updatedItem = { ...updateTodo, ...action.payload.data };
      const updatedTodos = [...state];
      updatedTodos[updateTodoIndex] = updatedItem;
      return updatedTodos;
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state;
  }
}

const TodosContextProvider = ({ children }) => {
  const [todosState, dispatch] = useReducer(todoReducer, []);

  const addTodo = (todoData) => {
    console.log('todoData', todoData);
    dispatch({ type: 'ADD', payload: todoData });
  }

  const setTodos = (todos) => {
    dispatch({ type: 'SET', payload: todos })
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  }

  const updateTodo = (id, todoData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: todoData } })
  }

  const value = {
    todos: todosState,
    setTodos: setTodos,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  )
}

export default TodosContextProvider;
