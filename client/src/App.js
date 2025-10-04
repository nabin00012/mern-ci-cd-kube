import React, { useState, useEffect } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { getMessages, createMessage } from './services/api';

function App() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMessages();
            setMessages(data.data || []);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMessageSubmit = async (messageData) => {
        try {
            setError(null);
            const newMessage = await createMessage(messageData);

            setMessages(prevMessages => [newMessage.data, ...prevMessages]);

            return { success: true };
        } catch (err) {
            console.error('Error creating message:', err);
            const errorMessage = err.response?.data?.error || 'Failed to send message';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const handleRefresh = () => {
        fetchMessages();
    };

    return (
        <div className="App">
            <Header />

            <main className="main-content">
                <div className="container">
                    <div className="app-header">
                        <h1>💬 Message Board</h1>
                        <p className="app-description">
                            Share your thoughts with the community! This is a full-stack MERN application
                            with real-time message posting and retrieval.
                        </p>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            {error}
                            <button
                                className="error-close"
                                onClick={() => setError(null)}
                                aria-label="Close error"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div className="app-grid">
                        <div className="form-section">
                            <MessageForm
                                onSubmit={handleMessageSubmit}
                                disabled={loading}
                            />
                        </div>

                        <div className="messages-section">
                            <div className="messages-header">
                                <h2>Recent Messages</h2>
                                <button
                                    onClick={handleRefresh}
                                    className="refresh-button"
                                    disabled={loading}
                                    aria-label="Refresh messages"
                                >
                                    {loading ? '🔄' : '↻'} Refresh
                                </button>
                            </div>

                            <MessageList
                                messages={messages}
                                loading={loading}
                                onRefresh={handleRefresh}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;