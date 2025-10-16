import React, { useState } from 'react';
import './MessageCard.css';

const MessageCard = ({ message, index, onReply, allMessages = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return '✨ Just now';
            if (minutes < 60) return `⚡ ${minutes}m ago`;
            if (hours < 24) return `🔥 ${hours}h ago`;
            if (days < 7) return `💫 ${days}d ago`;

            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return '✨ Just now';
        }
    };

    const handleReplyClick = () => {
        if (onReply) {
            onReply({
                id: message.id || message._id,
                author: message.author,
                text: message.text
            });
        }
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const shouldShowReadMore = message.text && message.text.length > 150;
    const displayText = isExpanded ? message.text : truncateText(message.text);

    // Find replies to this message
    const messageId = message.id || message._id;
    const replies = allMessages.filter(msg => msg.replyTo === messageId);

    // Get random gradient for avatar
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    ];
    const avatarGradient = gradients[index % gradients.length];

    return (
        <div className="message-card-crazy" style={{ '--index': index }}>
            <div className="card-shimmer"></div>
            <div className="card-glow"></div>
            
            <div className="message-header-crazy">
                <div className="author-info-crazy">
                    <div className="author-avatar-crazy" style={{ background: avatarGradient }}>
                        <span className="avatar-letter">{message.author ? message.author.charAt(0).toUpperCase() : '?'}</span>
                        <div className="avatar-ring"></div>
                        <div className="avatar-pulse"></div>
                    </div>
                    <div className="author-details-crazy">
                        <h4 className="author-name-crazy">
                            <span className="name-gradient">{message.author || 'Anonymous'}</span>
                            <span className="verified-badge">✓</span>
                        </h4>
                        <span className="message-date-crazy">
                            {formatDate(message.timestamp || message.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="message-meta-crazy">
                    <span className="message-number-crazy">#{index + 1}</span>
                    {replies.length > 0 && (
                        <span className="reply-count-badge">
                            💬 {replies.length}
                        </span>
                    )}
                </div>
            </div>

            {message.replyTo && message.replyToAuthor && (
                <div className="parent-message-indicator">
                    <div className="reply-arrow">↪️</div>
                    <div className="parent-info">
                        <span className="parent-label">Replying to</span>
                        <span className="parent-author">@{message.replyToAuthor}</span>
                    </div>
                </div>
            )}

            <div className="message-content-crazy">
                <div className="message-bubble">
                    <p className="message-text-crazy">
                        {displayText || 'No message content'}
                    </p>
                    {shouldShowReadMore && (
                        <button
                            className="read-more-button-crazy"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? '▲ Show less' : '▼ Read more'}
                        </button>
                    )}
                </div>
            </div>

            {replies.length > 0 && (
                <div className="inline-replies-section">
                    <div className="replies-header">
                        <span className="replies-title">💭 {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}</span>
                        <div className="replies-divider"></div>
                    </div>
                    <div className="replies-container">
                        {replies.map((reply, idx) => (
                            <div key={reply._id || reply.id} className="inline-reply-card" style={{ '--reply-index': idx }}>
                                <div className="reply-connector"></div>
                                <div className="reply-avatar-mini" style={{ background: gradients[(index + idx + 1) % gradients.length] }}>
                                    {reply.author ? reply.author.charAt(0).toUpperCase() : '?'}
                                </div>
                                <div className="reply-content-wrapper">
                                    <div className="reply-header-mini">
                                        <span className="reply-author-name">{reply.author || 'Anonymous'}</span>
                                        <span className="reply-action-text">replied to this</span>
                                        <span className="reply-time">{formatDate(reply.timestamp || reply.createdAt)}</span>
                                    </div>
                                    <p className="reply-text-mini">{reply.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="message-footer-crazy">
                <div className="message-stats-crazy">
                    <span className="stat-item-crazy">
                        <span className="stat-icon-crazy">💬</span>
                        <span className="stat-value">{replies.length} replies</span>
                    </span>
                    <span className="stat-divider-mini">•</span>
                    <span className="stat-item-crazy">
                        <span className="stat-icon-crazy">👤</span>
                        <span className="stat-value">{message.author || 'Anonymous'}</span>
                    </span>
                </div>
                <button 
                    className="reply-button-crazy"
                    onClick={handleReplyClick}
                    aria-label="Reply to this message"
                >
                    <span className="button-glow"></span>
                    <span className="reply-button-icon-crazy">💬</span>
                    <span className="reply-button-text-crazy">Reply</span>
                    <span className="button-sparkle">✨</span>
                </button>
            </div>
        </div>
    );
};

export default MessageCard;