import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * 50) + 10);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Simulate online users fluctuation
        const interval = setInterval(() => {
            setOnlineUsers(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                return Math.max(10, Math.min(100, prev + change));
            });
        }, 5000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-bg-effects">
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
                <div className="bg-orb orb-3"></div>
            </div>

            <div className="header-container">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo">
                            <div className="logo-icon-wrapper">
                                <span className="logo-icon">�</span>
                                <div className="icon-pulse"></div>
                            </div>
                            <div className="logo-text-wrapper">
                                <span className="logo-text">RealChat</span>
                                <span className="logo-subtitle">MERN Stack</span>
                            </div>
                        </div>
                    </div>

                    <nav className="nav">
                        <div className="status-indicator">
                            <div className="pulse-dot"></div>
                            <span className="status-text">
                                <span className="online-count">{onlineUsers}</span> online
                            </span>
                        </div>

                        <div className="tech-stack">
                            <div className="tech-badge mongo">
                                <span className="badge-icon">🍃</span>
                                <span className="badge-text">MongoDB</span>
                            </div>
                            <div className="tech-badge express">
                                <span className="badge-icon">⚡</span>
                                <span className="badge-text">Express</span>
                            </div>
                            <div className="tech-badge react">
                                <span className="badge-icon">⚛️</span>
                                <span className="badge-text">React</span>
                            </div>
                            <div className="tech-badge node">
                                <span className="badge-icon">🟢</span>
                                <span className="badge-text">Node.js</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;