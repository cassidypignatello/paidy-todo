import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoContext } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';

test('renders correctly', () => {
  const { getByPlaceholderText } = render(
    <TodoContext.Provider value={{ state: { todos: [] }, dispatch: jest.fn() }}>
      <TodoForm />
    </TodoContext.Provider>,
  );

  expect(getByPlaceholderText('Enter todo...')).toBeTruthy();
});

test('adds todo when form is submitted', () => {
  const dispatch = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <TodoContext.Provider value={{ state: { todos: [] }, dispatch }}>
      <TodoForm />
    </TodoContext.Provider>,
  );

  fireEvent.changeText(getByPlaceholderText('Enter todo...'), 'Test todo');
  fireEvent.press(getByText('Add Todo'));

  expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_TODO', payload: expect.anything() });
});
