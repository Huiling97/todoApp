import axios from 'axios';

const API_URL = 'https://todoapp-ff829-default-rtdb.asia-southeast1.firebasedatabase.app';

const saveTodo = async (todoData) => {
  const response = await axios.post(API_URL + '/todos.json', todoData);
  const id = response.data.name;
  return id;
}

const getTodos = async () => {
  const response = await axios.get(API_URL + '/todos.json');
  const todoList = [];

  for (const key in response.data) {
    const todoObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    todoList.push(todoObj);
  };
  return todoList;
}

const updateTodo = (id, todoData) => {
  return axios.put(API_URL + `/todos/${id}.json`, todoData);
}

const deleteTodo = (id) => {
  return axios.delete(API_URL + `/todos/${id}.json`)
}

export { saveTodo, getTodos, updateTodo, deleteTodo };
