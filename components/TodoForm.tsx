import React, { useState, useContext } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { TodoContext } from '../context/TodoContext';

// Generate a pseudo-random string ID
const generateID = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Form component for adding new todos
const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useContext(TodoContext);

  const submitTodo = () => {
    if (text.length > 0) {
      dispatch({ type: 'ADD_TODO', payload: { id: generateID(), text: text, completed: false } });
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Add Todo" onPress={submitTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    padding: 5,
  },
});

export default TodoForm;
