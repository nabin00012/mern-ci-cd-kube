import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">🚀</span>
                        <span className="logo-text">MERN Stack</span>
                    </div>

                    <nav className="nav">
                        <div className="nav-item">
                            <span className="tech-badge">MongoDB</span>
                        </div>
                        <div className="nav-item">
                            <span className="tech-badge">Express</span>
                        </div>
                        <div className="nav-item">
                            <span className="tech-badge">React</span>
                        </div>
                        <div className="nav-item">
                            <span className="tech-badge">Node.js</span>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;