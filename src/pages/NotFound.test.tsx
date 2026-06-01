import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

test('renders 404 page', () => {
    render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();

    expect(screen.getByText(/this page does not exist/i)).toBeInTheDocument();

    expect(screen.getByRole('link', {name: /back to home/i})).toBeInTheDocument();
});