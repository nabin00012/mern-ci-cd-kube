import React, { useState } from 'react';
import './MessageCard.css';

const MessageCard = ({ message, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Just now';
        }
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const shouldShowReadMore = message.text && message.text.length > 150;
    const displayText = isExpanded ? message.text : truncateText(message.text);

    return (
        <div className="message-card" style={{ '--index': index }}>
            <div className="message-header">
                <div className="author-info">
                    <div className="author-avatar">
                        {message.author ? message.author.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="author-details">
                        <h4 className="author-name">
                            {message.author || 'Anonymous'}
                        </h4>
                        <span className="message-date">
                            {formatDate(message.timestamp || message.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="message-meta">
                    <span className="message-number">#{index + 1}</span>
                </div>
            </div>

            <div className="message-content">
                <p className="message-text">
                    {displayText || 'No message content'}
                </p>

                {shouldShowReadMore && (
                    <button
                        className="read-more-button"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? '← Show less' : 'Read more →'}
                    </button>
                )}
            </div>

            <div className="message-footer">
                <div className="message-stats">
                    <span className="stat-item">
                        <span className="stat-icon">💬</span>
                        Message
                    </span>
                    <span className="stat-item">
                        <span className="stat-icon">👤</span>
                        {message.author || 'Anonymous'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;