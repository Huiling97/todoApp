import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../store/todos-context";
import { updateTodo } from '../../util/http';
import { getFormattedDate } from '../../util/date';
import ErrorOverlay from "../UI/ErrorOverlay";

import { GlobalStyles } from "../../constants/styles";

const TodoItem = (item) => {
  const { id, description, date, priority, completed } = item

  const [isCompleted, setIsCompleted] = useState(!!completed);
  const [error, setError] = useState();

  const navigation = useNavigation();
  const todosCtx = useContext(TodosContext);

  useEffect(() => {
    setIsCompleted(!!completed);
  }, [completed])

  const togglePressHandler = async () => {
    try {
      setIsCompleted(prevIsCompleted => !prevIsCompleted);
      const updatedIsCompleted = !isCompleted
      todosCtx.updateTodo(id, {...item, completed: updatedIsCompleted})
      await updateTodo(id, {...item, completed: updatedIsCompleted})
    } catch (e) {
      console.log('catch error', e)
      setError('Unable to complete todo now, please try again later');
    }
  }

  const itemPressHandler = () => {
    navigation.navigate('ManageTodo', {
      todoId: id
    });
  }

  if (error) {
    return (
      <ErrorOverlay />
    )
  }

  return (
    <Pressable 
      onPress={itemPressHandler} 
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.todoItem}>
          <View style={styles.itemDetails}>
            <View style={styles.checkboxContainer}>
              <Pressable 
                onPress={togglePressHandler}
                style={[styles.checkbox, isCompleted && styles.hidden]}
              />
              {isCompleted && (
                <Ionicons 
                  name="checkmark-circle-outline" 
                  size={38} 
                  color="white" 
                  onPress={togglePressHandler}
                />
              )}
            </View>
            <View>
              <Text style={[styles.textBase, styles.description, isCompleted && styles.faded]}>
                {description}
              </Text>
              <Text style={[styles.textBase, isCompleted && styles.faded]}>
                Due: {getFormattedDate(date)}
              </Text>
            </View>
        </View>
        <View style={[styles.priorityContainer, isCompleted && styles.faded]}>
          <Text style={styles.priority}>{priority.label}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default TodoItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  todoItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  itemDetails: {
    flexDirection: 'row',
  },  
  priorityContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  priority: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    paddingRight: 12,
  },
  checkbox: {
    width: 28,
    height: 30,
    marginRight: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    left: 3,
    top: 4
  },
  hidden: {
    display: 'none',
  },
  faded: {
    opacity: 0.50,
  }
});
