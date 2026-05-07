import { render, screen, waitFor } from '@testing-library/react';
import Results from './Results';
import { fetchPokemons } from '../../api/pokemonApi';
import type { Mock } from 'vitest';

vi.mock('../../api/pokemonApi', () => ({
  fetchPokemons: vi.fn(),
}));

test('shows loading state on initial render', () => {
    render(<Results searchQuery="" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders pokemon list after successful API call', async () => {
    (fetchPokemons as Mock).mockResolvedValue({
        results: [
            { name: 'pikachu', url: 'url1' },
            { name: 'bulbasaur', url: 'url2' },
        ],
    });

    render(<Results searchQuery="" />);

    await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

});
