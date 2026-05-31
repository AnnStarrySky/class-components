import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
import { fetchPokemons, fetchOnePokemon } from '../../api/pokemonApi';
import type { Mock } from 'vitest';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithQuery } from '../../test-utils';

vi.mock('../../api/pokemonApi', () => ({
    fetchPokemons: vi.fn(),
    fetchOnePokemon: vi.fn(),
}));

test('shows loading state on initial render', async () => {
    (fetchPokemons as Mock).mockResolvedValue({ results: [] });

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="" />
        </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
});

test('renders pokemon list after successful API call', async () => {
    (fetchPokemons as Mock).mockResolvedValue({
        results: [
            { name: 'pikachu', url: 'url1' },
            { name: 'bulbasaur', url: 'url2' },
        ],
    });

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="" />
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('pikachu')).toBeInTheDocument();
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
});

test('fetches and renders single pokemon when searchQuery is provided', async () => {
    (fetchOnePokemon as Mock).mockResolvedValue({
        name: 'pikachu',
        stats: [
            {
                base_stat: 90,
                stat: { name: 'speed' },
            },
        ],
    });

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="pikachu" />
        </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(await screen.findByText(/speed/i)).toBeInTheDocument();
    expect(await screen.findByText(/90/i)).toBeInTheDocument();
});    

test('shows "no results found" when API returns empty list', async () => {
    (fetchPokemons as Mock).mockResolvedValue({ results: [] });;

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="" />
        </MemoryRouter>
    );
    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
});

test('shows error message when API fails', async () => {
    (fetchPokemons as Mock).mockRejectedValue(new Error('API failed'));

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="" />
        </MemoryRouter>
    );
    expect(await screen.findByText(/failed to load data/i)).toBeInTheDocument();
}); 

test('renders pokemon without stats (shows url fallback)', async () => {
    (fetchPokemons as Mock).mockResolvedValue({
        results: [
            { name: 'pikachu', url: 'https://pokeapi.co' },
        ],
    });

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="" />
        </MemoryRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(await screen.findByText(/pokeapi\.co/i)).toBeInTheDocument();
});

test('refetches data when searchQuery changes', async () => {
    (fetchOnePokemon as Mock)
        .mockResolvedValueOnce({ name: 'pikachu' })
        .mockResolvedValueOnce({ name: 'charizard' });

    const { unmount } = renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="pikachu" />
        </MemoryRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();

    unmount();

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="charizard" />
        </MemoryRouter>
    );

    expect(await screen.findByText('charizard')).toBeInTheDocument();
});

test('shows "Pokemon not found" when searching for non-existent pokemon', async () => {
    (fetchOnePokemon as Mock).mockRejectedValue(new Error('Not Found'));

    renderWithQuery(
        <MemoryRouter>
            <Results searchQuery="unknown-pokemon" />
        </MemoryRouter>
    );

    expect(await screen.findByText(/pokemon not found/i)).toBeInTheDocument();
});