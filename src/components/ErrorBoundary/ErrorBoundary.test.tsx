import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorSimulator from './ErrorSimulator';

beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
});

test('shows fallback UI after clicking error button', () => {
    render(
        <ErrorBoundary>
            <ErrorSimulator/>
        </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please reload the page/i)).toBeInTheDocument();
});

test('logs error to console when error happens', () => {
    render(
        <ErrorBoundary>
            <ErrorSimulator />
        </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(console.error).toHaveBeenCalled();
});