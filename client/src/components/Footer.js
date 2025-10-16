import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-crazy">
            <div className="footer-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
                <div className="particle particle-6"></div>
            </div>

            <div className="footer-glow-top"></div>

            <div className="footer-container-crazy">
                <div className="footer-main-content">
                    <div className="footer-brand-section">
                        <h3 className="footer-brand-title">
                            <span className="brand-icon">🚀</span>
                            <span className="brand-text">RealChat</span>
                        </h3>
                        <p className="footer-brand-tagline">
                            Lightning-fast real-time messaging powered by cutting-edge MERN stack technology
                        </p>
                        <div className="footer-tech-grid">
                            <div className="tech-pill">
                                <span className="tech-icon">🍃</span>
                                <span>MongoDB</span>
                            </div>
                            <div className="tech-pill">
                                <span className="tech-icon">⚡</span>
                                <span>Express</span>
                            </div>
                            <div className="tech-pill">
                                <span className="tech-icon">⚛️</span>
                                <span>React</span>
                            </div>
                            <div className="tech-pill">
                                <span className="tech-icon">💚</span>
                                <span>Node.js</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-features-section">
                        <h4 className="footer-section-title">✨ Features</h4>
                        <ul className="footer-features-list">
                            <li className="feature-item">
                                <span className="feature-bullet">�</span>
                                <span>Real-time Messaging</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-bullet">💬</span>
                                <span>Threaded Replies</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-bullet">🎨</span>
                                <span>Glassmorphism UI</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-bullet">🚀</span>
                                <span>CI/CD Pipeline</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-section-title">🔗 Quick Links</h4>
                        <ul className="footer-links-list">
                            <li>
                                <a href="/api/health" className="footer-link" target="_blank" rel="noopener noreferrer">
                                    <span className="link-icon">💚</span>
                                    <span>Health Check</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/nabin00012/mern-ci-cd-kube" className="footer-link" target="_blank" rel="noopener noreferrer">
                                    <span className="link-icon">⭐</span>
                                    <span>GitHub Repo</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://reactjs.org" className="footer-link" target="_blank" rel="noopener noreferrer">
                                    <span className="link-icon">📚</span>
                                    <span>Documentation</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-divider">
                    <div className="divider-line"></div>
                    <div className="divider-glow"></div>
                </div>

                <div className="footer-bottom-crazy">
                    <div className="footer-love-section">
                        <span className="love-text">Made with</span>
                        <span className="love-heart">❤️</span>
                        <span className="love-text">by</span>
                        <span className="creator-name">Nabin Chapagain</span>
                    </div>

                    <div className="footer-meta">
                        <span className="footer-year">© {currentYear}</span>
                        <span className="footer-separator">•</span>
                        <span className="footer-status">
                            <span className="status-dot"></span>
                            <span>All Systems Operational</span>
                        </span>
                    </div>

                    <div className="footer-badges-crazy">
                        <div className="badge-crazy">
                            <span className="badge-icon">⚛️</span>
                            <span className="badge-label">React {React.version}</span>
                        </div>
                        <div className="badge-crazy">
                            <span className="badge-icon">💚</span>
                            <span className="badge-label">Node.js</span>
                        </div>
                        <div className="badge-crazy">
                            <span className="badge-icon">🍃</span>
                            <span className="badge-label">MongoDB</span>
                        </div>
                    </div>
                </div>

                <div className="footer-signature">
                    <span className="signature-text">Crafted with passion and innovation</span>
                    <span className="signature-sparkle">✨</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;