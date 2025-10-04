import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the API calls
jest.mock('./services/api', () => ({
    getMessages: jest.fn(() => Promise.resolve({ data: [] })),
    createMessage: jest.fn(() => Promise.resolve({ data: { id: 1, text: 'Test', author: 'Test' } })),
}));

test('renders message board title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Message Board/i);
    expect(titleElement).toBeInTheDocument();
});

test('renders MERN stack header', () => {
    render(<App />);
    const headerElement = screen.getByText(/MERN Stack/i);
    expect(headerElement).toBeInTheDocument();
});

test('renders message form', () => {
    render(<App />);
    const formElement = screen.getByText(/Share Your Thoughts/i);
    expect(formElement).toBeInTheDocument();
});

test('renders tech badges', () => {
    render(<App />);
    const mongoElement = screen.getByText(/MongoDB/i);
    const expressElement = screen.getByText(/Express/i);
    const reactElement = screen.getByText(/React/i);
    const nodeElement = screen.getByText(/Node.js/i);

    expect(mongoElement).toBeInTheDocument();
    expect(expressElement).toBeInTheDocument();
    expect(reactElement).toBeInTheDocument();
    expect(nodeElement).toBeInTheDocument();
});