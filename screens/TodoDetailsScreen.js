import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TodoContext } from '../TodoContext';

const TodoDetailsScreen = ({ route, navigation }) => {
  const { todo } = route.params;
  const { addTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [title, setTitle] = useState(todo ? todo.title : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [status, setStatus] = useState(todo ? todo.status : 'Pending');

  const saveTodo = () => {
    if (title.trim() === '') {
      Alert.alert('Title cannot be empty');
      return;
    }

    const newTodo = {
      id: todo ? todo.id : Date.now(),
      title: title,
      description: description,
      status: status,
    };

    if (!todo) {
      addTodo(newTodo);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (todo) {
      deleteTodo(todo.id);
    }
    navigation.goBack();
  };

  const handleUpdate = () => {
    if (title.trim() === '') {
      Alert.alert('Title cannot be empty');
      return;
    }

    const updatedTodo = {
      id: todo.id,
      title: title,
      description: description,
      status: status,
    };

    if (updatedTodo) {
      updateTodo(updatedTodo);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Todo Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.statusContainer}>
        <Picker
          style={styles.statusPicker}
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Done" value="Done" />
          <Picker.Item label="Delayed" value="Delayed" />
          <Picker.Item label="Cancelled" value="Cancelled" />
        </Picker>
      </View>
      {!todo && <Button title="Save" onPress={saveTodo} />}
      {todo && (
        <View style={styles.buttonContainer}>
          <Button
            title="Delete"
            onPress={handleDelete}
            color="red"
            style={styles.button}
          />
          <View style={styles.buttonGap} />
          <Button
            title="Update"
            onPress={handleUpdate}
            style={styles.button}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: "50%"
  },
  statusLabel: {
    fontSize: 16,
  },
  statusPicker: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
  buttonGap: {
    width: 10,
  },
});

export default TodoDetailsScreen;