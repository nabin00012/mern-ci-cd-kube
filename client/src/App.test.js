import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the API calls
jest.mock('./services/api', () => ({
    getMessages: jest.fn(() => Promise.resolve({ data: [] })),
    createMessage: jest.fn(() => Promise.resolve({ data: { id: 1, text: 'Test', author: 'Test' } })),
}));

describe('App Component', () => {
    test('renders RealChat application title', async () => {
        render(<App />);
        await waitFor(() => {
            const titleElement = screen.getByText(/RealChat/i);
            expect(titleElement).toBeInTheDocument();
        });
    });

    test('renders logo subtitle with MERN Stack', async () => {
        render(<App />);
        await waitFor(() => {
            const logoSubtitle = screen.getByText((content, element) => {
                return element?.className === 'logo-subtitle' && content.includes('MERN Stack');
            });
            expect(logoSubtitle).toBeInTheDocument();
        });
    });

    test('renders message form with Share Your Thoughts', async () => {
        render(<App />);
        await waitFor(() => {
            const formElement = screen.getByText(/Share Your Thoughts/i);
            expect(formElement).toBeInTheDocument();
        });
    });

    test('renders tech badges in header', async () => {
        render(<App />);
        await waitFor(() => {
            // Query by more specific selectors to avoid duplicates
            const badges = screen.getAllByText(/MongoDB/i);
            expect(badges.length).toBeGreaterThan(0);
            
            const expressBadges = screen.getAllByText(/Express/i);
            expect(expressBadges.length).toBeGreaterThan(0);
            
            const reactBadges = screen.getAllByText(/React/i);
            expect(reactBadges.length).toBeGreaterThan(0);
            
            const nodeBadges = screen.getAllByText(/Node\.js/i);
            expect(nodeBadges.length).toBeGreaterThan(0);
        });
    });

    test('renders live messages section', async () => {
        render(<App />);
        await waitFor(() => {
            const messagesSection = screen.getByText(/Live Messages/i);
            expect(messagesSection).toBeInTheDocument();
        });
    });

    test('renders empty state when no messages', async () => {
        render(<App />);
        await waitFor(() => {
            const emptyState = screen.getByText(/No messages yet/i);
            expect(emptyState).toBeInTheDocument();
        });
    });

    test('renders input fields for author and message', async () => {
        render(<App />);
        await waitFor(() => {
            const authorInput = screen.getByPlaceholderText(/Enter your name/i);
            const messageInput = screen.getByPlaceholderText(/What's on your mind/i);
            
            expect(authorInput).toBeInTheDocument();
            expect(messageInput).toBeInTheDocument();
        });
    });
});