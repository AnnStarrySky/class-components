import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Details from './Details';
import { fetchOnePokemon } from '../../api/pokemonApi';
import type { Mock } from 'vitest';

vi.mock('../../api/pokemonApi', () => ({
    fetchOnePokemon: vi.fn(),
}));

test('shows loading and renders data', async () => {
    (fetchOnePokemon as Mock).mockResolvedValue({
        name: 'pikachu',
        stats: [
            {
                base_stat: 90,
                stat: { name: 'speed' },
            },
        ],
    });

    render(
        <MemoryRouter initialEntries={['/details/pikachu']}>
            <Routes>
                <Route
                    path="/details/:id"
                    element={<Details />}
                />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText(/loading details/i)).toBeInTheDocument();

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(await screen.findByText(/speed/i)).toBeInTheDocument();
});

test('shows error', async () => {
    (fetchOnePokemon as Mock).mockRejectedValue(new Error('error'));

    render(
        <MemoryRouter initialEntries={['/details/pikachu']}>
            <Routes>
                <Route
                    path="/details/:id"
                    element={<Details />}
                />
            </Routes>
        </MemoryRouter>
    );

    expect(await screen.findByText(/failed to load pokemon/i)).toBeInTheDocument();
});