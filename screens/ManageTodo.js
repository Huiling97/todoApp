import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import TodoForm from '../components/ManageTodo/TodoForm';
import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { TodosContext } from "../store/todos-context";
import { saveTodo, updateTodo, deleteTodo } from '../util/http';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageTodo = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState();

  const todosCtx = useContext(TodosContext);

  const editTodoId = route.params?.todoId;
  const isEditing = !!editTodoId;

  const selectedTodo = 
    todosCtx.todos.find(todo => todo.id === editTodoId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Todo' : 'Add Todo'
    })
  }, [navigation, isEditing]);

  const deleteTodoHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteTodo(editTodoId);
      todosCtx.deleteTodo(editTodoId);
      navigation.goBack();
    } catch(e) {
      setError('Unable to delete todo, please try again later')
    }
    setIsSubmitting(false);

  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (todoData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        todosCtx.updateTodo(editTodoId, todoData);
        await updateTodo(editTodoId, todoData);
      } else {
        const id = await saveTodo(todoData);
        todosCtx.addTodo({ ...todoData, id: id });
      }
      navigation.goBack();
    } catch (e) {
      setError('Unable to set todo, please try again later');
    }
    setIsSubmitting(false);
  };

  const errorHandler = () => {
    setError(null);
  }

  if (error && !isSubmitting) {
    return (
      <ErrorOverlay message={error} onConfirm={errorHandler} />
    )
  }

  if (isSubmitting) {
    return (
      <LoadingOverlay />
    );
  }

  return (
    <View style={styles.container}>
      <TodoForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onSubmit={confirmHandler}
        onCancel={cancelHandler} 
        defaultValues={selectedTodo}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon='trash' 
            color={GlobalStyles.colors.error500} 
            size={36} 
            onPress={deleteTodoHandler} 
          />
        </View>
      )}
    </View>
  )
}

export default ManageTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
