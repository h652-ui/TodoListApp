import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TodoProvider } from './TodoContext';

import TodoListScreen from './screens/TodoListScreen';
import TodoDetailsScreen from './screens/TodoDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen name="TodoList" component={TodoListScreen} />
          <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
};

export default App;