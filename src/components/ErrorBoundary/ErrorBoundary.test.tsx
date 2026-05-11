import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ErrorSimulator from './ErrorSimulator';

test('shows fallback UI after clicking error button', () => {
    render(
        <ErrorBoundary>
            <ErrorSimulator/>
        </ErrorBoundary>
    )

    const button = screen.getByRole('button')

    fireEvent.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please reload the page/i)).toBeInTheDocument();
});

test('logs error to console when error happens', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
    <ErrorBoundary>
      <ErrorSimulator />
    </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(consoleSpy).toHaveBeenCalled();
});    