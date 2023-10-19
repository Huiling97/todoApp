import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import ManageTodo from "./screens/ManageTodo";
import DueSoonTodos from "./screens/DueSoonTodos";
import AllTodos from "./screens/AllTodos";
import TodosContextProvider from "./store/todos-context";
import IconButton from "./components/UI/IconButton";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const TodosOverview = () => {
  return (
    <BottomTabs.Navigator 
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => 
          <IconButton 
            icon='add' 
            size={24} 
            color={tintColor} 
            onPress={() => navigation.navigate('ManageTodo')}/>
      })}
    >
      <BottomTabs.Screen 
        name="Due Soon" 
        component={DueSoonTodos} 
        options={{
          title: 'Due Soon',
          tabBarLabel: 'Due Soon',
          tabBarIcon: ({ color, size }) => 
            <Ionicons name='hourglass' size={size} color={color}/>
        }}
      />
      <BottomTabs.Screen 
        name="All Todos" 
        component={AllTodos}
        options={{
          title: 'All Todos',
          tabBarLabel: 'All Todos',
          tabBarIcon: ({ color, size }) => 
            <Ionicons name='calendar' size={size} color={color}/>
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TodosContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
              headerTintColor: 'white'
            }
          }}>
            <Stack.Screen 
              name="Todos overview" 
              component={TodosOverview} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="ManageTodo" 
              component={ManageTodo} 
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodosContextProvider>
    </>
  )
};
