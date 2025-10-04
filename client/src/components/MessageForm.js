import React, { useState } from 'react';
import './MessageForm.css';

const MessageForm = ({ onSubmit, disabled }) => {
    const [formData, setFormData] = useState({
        text: '',
        author: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.text.trim() || !formData.author.trim()) {
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            const result = await onSubmit({
                text: formData.text.trim(),
                author: formData.author.trim()
            });

            if (result.success) {
                setFormData({ text: '', author: '' });
                setSuccessMessage('Message posted successfully! 🎉');

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.text.trim() && formData.author.trim();

    return (
        <div className="message-form-container">
            <div className="form-header">
                <h2>📝 Share Your Thoughts</h2>
                <p>Post a message to the community board</p>
            </div>

            {successMessage && (
                <div className="success-message">
                    <span className="success-icon">✅</span>
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="message-form">
                <div className="form-group">
                    <label htmlFor="author" className="form-label">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter your name..."
                        disabled={disabled || isSubmitting}
                        className="form-input"
                        maxLength="100"
                        required
                    />
                    <div className="char-count">
                        {formData.author.length}/100
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="text" className="form-label">
                        Your Message
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="What's on your mind? Share something interesting..."
                        disabled={disabled || isSubmitting}
                        className="form-textarea"
                        rows="4"
                        maxLength="500"
                        required
                    />
                    <div className="char-count">
                        {formData.text.length}/500
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || disabled || isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading-spinner"></span>
                            Posting...
                        </>
                    ) : (
                        <>
                            <span className="submit-icon">🚀</span>
                            Post Message
                        </>
                    )}
                </button>
            </form>

            <div className="form-footer">
                <p className="form-note">
                    💡 <strong>Tip:</strong> Be respectful and keep it friendly!
                </p>
            </div>
        </div>
    );
};

export default MessageForm;