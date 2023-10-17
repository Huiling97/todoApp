import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { getFormattedDate } from '../../util/date';

import { GlobalStyles } from "../../constants/styles";

const TodoItem = ({ id, description, date, priority }) => {
  const navigation = useNavigation();

  const itemPressHandler = () => {
    navigation.navigate('ManageTodo', {
      todoId: id
    });
  }

  return (
    <Pressable 
      onPress={itemPressHandler} 
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.todoItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>Due: {getFormattedDate(date)}</Text>
        </View>
        <View style={styles.priorityContainer}>
          <Text style={styles.priority}>{priority.label}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default TodoItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
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
});
