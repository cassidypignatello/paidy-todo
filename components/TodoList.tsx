import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { TodoContext } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const { state: { todos }, dispatch } = useContext(TodoContext);

  const updateTodo = (todoToUpdate) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      }
    });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.todo}>
      <Text
        style={[styles.todoText, item.completed ? styles.completed : null]}
        onPress={() => updateTodo(item)}
      >
        {item.text}
      </Text>
      <Button title="Delete" onPress={() => deleteTodo(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  todoText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});

export default TodoList;
