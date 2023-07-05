import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { TodoContext } from '../TodoContext';

const TodoListScreen = ({ navigation }) => {
  const { todos } = useContext(TodoContext);

  const renderTodoItem = ({ item }) => {
    let textColor = '#000'; // Default text color

    switch (item.status) {
      case 'Done':
        textColor = 'green';
        break;
      case 'Pending':
        textColor = 'darkblue';
        break;
      case 'Cancelled':
        textColor = 'red';
        break;
      case 'Delayed':
        textColor = 'orangered';
        break;
      default:
        break;
    }

    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => navigation.navigate('TodoDetails', { todo: item })}
      >
        <View style={styles.todoItemContent}>
          <Text style={[styles.todoItemTitle]}>
            {item.title}
          </Text>
          <Text style={[styles.todoItemDescription]}>
            {item.description}
          </Text>
          <Text style={[styles.todoItemStatus, { color: textColor }]}>
            Status: {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const createNewTodo = () => {
    navigation.navigate('TodoDetails', { todo: null });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.todoList}
      />
      <Button title="Add New Task" onPress={createNewTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoList: {
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoItemContent: {
    flex: 1,
  },
  todoItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItemDescription: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});

export default TodoListScreen;
