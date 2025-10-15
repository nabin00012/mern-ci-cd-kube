import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from './App';

// Mock the API calls
jest.mock('./services/api', () => ({
    getMessages: jest.fn(() => Promise.resolve({ data: [] })),
    createMessage: jest.fn(() => Promise.resolve({ data: { id: 1, text: 'Test', author: 'Test' } })),
}));

test('renders message board title', async () => {
    await act(async () => {
        render(<App />);
    });
    await waitFor(() => {
        const titleElement = screen.getByText(/Message Board/i);
        expect(titleElement).toBeInTheDocument();
    });
});

test('renders MERN stack header', async () => {
    await act(async () => {
        render(<App />);
    });
    await waitFor(() => {
        const headerElement = screen.getByText(/MERN Stack/i);
        expect(headerElement).toBeInTheDocument();
    });
});

test('renders message form', async () => {
    await act(async () => {
        render(<App />);
    });
    await waitFor(() => {
        const formElement = screen.getByText(/Share Your Thoughts/i);
        expect(formElement).toBeInTheDocument();
    });
});

test('renders tech badges', async () => {
    await act(async () => {
        render(<App />);
    });
    await waitFor(() => {
        const mongoElement = screen.getByText(/MongoDB/i);
        const expressElement = screen.getByText(/Express/i);
        const reactElement = screen.getByText(/React/i);
        const nodeElement = screen.getByText(/Node.js/i);

        expect(mongoElement).toBeInTheDocument();
        expect(expressElement).toBeInTheDocument();
        expect(reactElement).toBeInTheDocument();
        expect(nodeElement).toBeInTheDocument();
    });
});