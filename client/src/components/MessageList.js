import React from 'react';
import MessageCard from './MessageCard';
import './MessageList.css';

const MessageList = ({ messages, loading, onRefresh, onReply }) => {
    if (loading) {
        return (
            <div className="message-list">
                <div className="loading-container">
                    <div className="loading-spinner-large"></div>
                    <p className="loading-text">Loading messages...</p>
                </div>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="message-list">
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No messages yet</h3>
                    <p>Be the first to share something with the community!</p>
                    <button onClick={onRefresh} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="message-list">
            <div className="message-count">
                <span className="count-badge">{messages.length}</span>
                {messages.length === 1 ? 'message' : 'messages'}
            </div>

            <div className="messages-container">
                {messages.map((message, index) => (
                    <MessageCard
                        key={message.id || message._id || index}
                        message={message}
                        index={index}
                        onReply={onReply}
                        allMessages={messages}
                    />
                ))}
            </div>

            {messages.length >= 10 && (
                <div className="load-more-container">
                    <p className="load-more-text">
                        Showing latest {messages.length} messages
                    </p>
                </div>
            )}
        </div>
    );
};

export default MessageList;