import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      const storedTodos = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTodos(storedTodos);
    } catch (error) {
      console.log('Error loading data: ', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const updatedTodos = [...todos, newTodo];
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (error) {
      console.log('Error adding todo: ', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (error) {
      console.log('Error deleting todo: ', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo } : todo
      );
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
    } catch (error) {
      console.log('Error updating todo status: ', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
