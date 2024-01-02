import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Search from '../Search';

jest.mock('../context.js'); // Replace with the actual path to your context file

describe('Search component', () => {
  test('renders search input and handles query change', () => {
    const mockSetQuery = jest.fn();
    const mockIsError = { show: false, msg: '' };
    useGlobalContext.mockReturnValue({ query: '', setQuery: mockSetQuery, isError: mockIsError });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    // Assert that the search input is rendered
    const searchInput = screen.getByPlaceholderText('Enter movie name...');
    expect(searchInput).toBeInTheDocument();

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Avengers' } });

    // Assert that the setQuery function is called with the correct value
    expect(mockSetQuery).toHaveBeenCalledWith('Avengers');
  });

  test('renders error message when isError is true', () => {
    const mockSetQuery = jest.fn();
    const mockIsError = { show: true, msg: 'Error message' };
    useGlobalContext.mockReturnValue({ query: '', setQuery: mockSetQuery, isError: mockIsError });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    // Assert that the error message is rendered
    const errorMessage = screen.getByText('Error message');
    expect(errorMessage).toBeInTheDocument();
  });
});