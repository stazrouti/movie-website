import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Movies from '../Movies';

jest.mock('../context.js'); // Replace with the actual path to your context file

describe('Movies component', () => {
  test('renders loading message when isLoading is true', () => {
    const mockIsLoading = true;
    useGlobalContext.mockReturnValue({ movie: [], isLoading: mockIsLoading });

    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>
    );

    // Assert that the loading message is rendered
    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders movie cards when isLoading is false', () => {
    const mockIsLoading = false;
    const mockMovie = [
      { imdbID: '1', Title: 'Movie 1', Poster: 'poster1.jpg' },
      { imdbID: '2', Title: 'Movie 2', Poster: 'poster2.jpg' },
    ];
    useGlobalContext.mockReturnValue({ movie: mockMovie, isLoading: mockIsLoading });

    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>
    );

    // Assert that the movie cards are rendered
    const movieCards = screen.getAllByRole('link');
    expect(movieCards).toHaveLength(mockMovie.length);
  });
});