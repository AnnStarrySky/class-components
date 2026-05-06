import { render, screen } from '@testing-library/react';
import Search from './Search';
import { fireEvent } from '@testing-library/react';

test('renders search input', () => {

    render(<Search onSearch={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders input with value from localStorage', () => {

    localStorage.setItem('searchQuery', 'pikachu');

    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('pikachu');
});

test('updates input value on user typing', () => {

    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'charizard' } });

    expect(input).toHaveValue('charizard');
});

test('calls onSearch with trimmed value and saves to localStorage', () => {

    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '  bulbasaur  ' }});
    fireEvent.click(button);

    expect(onSearch).toHaveBeenLastCalledWith('bulbasaur');
    expect(localStorage.getItem('searchQuery')).toBe('bulbasaur');
});