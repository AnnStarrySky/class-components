import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

test('renders About page content', () => {
    render(
        <MemoryRouter>
            <About />
        </MemoryRouter>
    );

    expect(screen.getByText(/about app/i)).toBeInTheDocument();

    expect(screen.getByText(/author: annstarrysky/i)).toBeInTheDocument();

    expect(screen.getByRole('link', {name: /back to home/i})).toBeInTheDocument();
});