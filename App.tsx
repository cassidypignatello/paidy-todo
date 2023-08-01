import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App: React.FC = () => {
  // Wrap the entire app in the TodoProvider to make the todo state accessible everywhere
  return (
    <SafeAreaView style={styles.container}>
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default App;
