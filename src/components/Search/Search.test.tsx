import { render, screen } from '@testing-library/react';
import Search from './Search';

test('renders search input', () => {
  render(<Search onSearch={() => {}} />);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});