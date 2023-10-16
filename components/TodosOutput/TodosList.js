import { FlatList, Text, View } from "react-native";
import TodoItem from "./TodoItem";

const renderTodoItem = (itemData) => {
  return (
    <View>
      <TodoItem {...itemData.item} />
    </View>
  )
}

const TodosList = ({ todos }) => {
  return (
      <FlatList 
        data={todos} 
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
  )
}

export default TodosList;
