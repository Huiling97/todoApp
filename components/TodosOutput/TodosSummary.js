import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TodosSummary = ({ todos, periodName }) => {
  const totalTodos = todos.length;

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>Total number of Todos: {totalTodos}</Text>
    </View>
  )
}

export default TodosSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
});
