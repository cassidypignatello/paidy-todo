import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoContext } from '../context/TodoContext';
import TodoList from '../components/TodoList';

test('renders correctly', () => {
  const { getByText } = render(
    <TodoContext.Provider value={{ state: { todos: [{ id: '1', text: 'Test todo', completed: false }] }, dispatch: jest.fn() }}>
      <TodoList />
    </TodoContext.Provider>,
  );

  expect(getByText('Test todo')).toBeTruthy();
});

test('deletes todo when delete button is pressed', () => {
  const dispatch = jest.fn();
  const { getByText } = render(
    <TodoContext.Provider value={{ state: { todos: [{ id: '1', text: 'Test todo', completed: false }] }, dispatch }}>
      <TodoList />
    </TodoContext.Provider>,
  );

  fireEvent.press(getByText('Delete'));

  expect(dispatch).toHaveBeenCalledWith({ type: 'DELETE_TODO', payload: '1' });
});
