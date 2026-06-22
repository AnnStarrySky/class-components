import { screen } from '@testing-library/react';
import App from './App';
import { renderWithQuery } from './test-utils';

test('renders app routes', () => {
    renderWithQuery(<App />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
});