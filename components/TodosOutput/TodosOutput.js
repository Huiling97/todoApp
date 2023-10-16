import { View, StyleSheet, Text } from "react-native";
import TodosSummary from "./TodosSummary";
import TodosList from "./TodosList";
import { GlobalStyles } from "../../constants/styles";

const TodosOutput = ({ todos, todoPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (todos.length > 0) {
    content = <TodosList todos={todos} />;
  }

  return (
    <View style={styles.container}>
      <TodosSummary todos={todos} periodName={todoPeriod} />
      {content}
    </View> 
  )
}

export default TodosOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
