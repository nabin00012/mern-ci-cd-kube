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
            <div className="app-background">
                <div className="gradient-orb orb-purple"></div>
                <div className="gradient-orb orb-blue"></div>
                <div className="gradient-orb orb-pink"></div>
            </div>

            <Header />

            <main className="main-content">
                <div className="container">
                    <div className="hero-section">
                        <div className="hero-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">⚡ Real-Time Chat Application</span>
                        </div>
                        <h1 className="hero-title">
                            Welcome to <span className="gradient-text">RealChat</span>
                        </h1>
                        <p className="hero-description">
                            Experience lightning-fast real-time messaging powered by cutting-edge MERN stack technology.
                            Connect, communicate, and collaborate instantly with our advanced chat platform.
                        </p>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-value">{messages.length}+</div>
                                <div className="stat-label">Messages</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">∞</div>
                                <div className="stat-label">Possibilities</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">24/7</div>
                                <div className="stat-label">Available</div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <div className="error-content">
                                <span className="error-icon">⚠️</span>
                                <span className="error-message">{error}</span>
                            </div>
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
                        <div className="form-section glass-card">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <span className="title-icon">✍️</span>
                                    Send Message
                                </h2>
                                <div className="live-indicator">
                                    <span className="live-dot"></span>
                                    <span className="live-text">LIVE</span>
                                </div>
                            </div>
                            <MessageForm
                                onSubmit={handleMessageSubmit}
                                disabled={loading}
                            />
                        </div>

                        <div className="messages-section glass-card">
                            <div className="messages-header">
                                <div className="header-left">
                                    <h2 className="section-title">
                                        <span className="title-icon">💬</span>
                                        Live Messages
                                    </h2>
                                    <span className="message-count">{messages.length} messages</span>
                                </div>
                                <button
                                    onClick={handleRefresh}
                                    className={`refresh-button ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                    aria-label="Refresh messages"
                                >
                                    <span className="refresh-icon">{loading ? '⟳' : '↻'}</span>
                                    <span className="refresh-text">Refresh</span>
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