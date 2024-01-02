import { render, screen } from '@testing-library/react';
import Error from '../Error';

test('renders Error component', () => {
  render(<Error />);
  
  // Assert that the Error component is rendered
  const errorElement = screen.getByText(/Error/i);
  expect(errorElement).toBeInTheDocument();
});