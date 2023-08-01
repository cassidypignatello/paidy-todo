import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button, ListRenderItem } from 'react-native';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types';

const TodoList: React.FC = () => {
  const { state: { todos }, dispatch } = useContext(TodoContext);

  const [editingTodo, setEditingTodo] = useState<string | null>(null); // to track which todo is being edited
  const [todoBeingEdited, setTodoBeingEdited] = useState<string>(''); // to keep the value of the todo item being edited

  const updateTodo = (todoToUpdate: Todo) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      },
    });
  };

  const startEditingTodo = (id: string, text: string) => {
    setEditingTodo(id);
    setTodoBeingEdited(text);
  };

  const submitEdit = (id: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text: todoBeingEdited } });
    setEditingTodo(null);
    setTodoBeingEdited('');
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <View style={styles.todo}>
      {editingTodo === item.id ? (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput
            value={todoBeingEdited}
            onChangeText={setTodoBeingEdited}
            style={{ marginRight: 10, flex: 1 }}
          />
          <Button title="Submit Edit" onPress={() => submitEdit(item.id)} />
        </View>
      ) : (
        <Text
          style={[styles.todoText, item.completed ? styles.completed : null]}
          onPress={() => updateTodo(item)}
        >
          {item.text}
        </Text>
      )}
      <View style={{ flexDirection: 'row' }}>
        {!item.completed && (
          <Button title="Edit" onPress={() => startEditingTodo(item.id, item.text)} />
        )}
        <Button title="Delete" onPress={() => deleteTodo(item.id)} />
      </View>
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
