import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Authentication from './components/Authentication';

const App: React.FC = () => {
  // Wrap the entire app in the TodoProvider to make the todo state accessible everywhere
  // Also wrap the TodoForm and TodoList in the Authentication component to ensure they aren't accessible until authenticated
  return (
    <SafeAreaView style={styles.container}>
      <TodoProvider>
        <Authentication>
          <TodoForm />
          <TodoList />
        </Authentication>
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
