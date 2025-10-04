import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">MERN Stack Demo</h3>
                        <p className="footer-description">
                            A full-stack application built with MongoDB, Express.js, React.js, and Node.js
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Tech Stack</h4>
                        <ul className="footer-list">
                            <li>MongoDB Database</li>
                            <li>Express.js Backend</li>
                            <li>React.js Frontend</li>
                            <li>Node.js Runtime</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Features</h4>
                        <ul className="footer-list">
                            <li>🚀 CI/CD Pipeline</li>
                            <li>🐳 Docker Containers</li>
                            <li>☸️ Kubernetes Ready</li>
                            <li>🧪 Testing Setup</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Links</h4>
                        <ul className="footer-list">
                            <li>
                                <a href="/api/health" target="_blank" rel="noopener noreferrer">
                                    API Health Check
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    View on GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                                    React Docs
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © {currentYear} MERN Stack Project. Built with ❤️ for learning.
                        </p>
                        <div className="footer-badges">
                            <span className="badge">React {React.version}</span>
                            <span className="badge">Node.js</span>
                            <span className="badge">MongoDB</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;