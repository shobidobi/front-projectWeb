import React from 'react';
import './Feature.css';

const FeatureSection = () => {
    return (
        <div className="feature-container">
            <div className="feature">
                <i className="fas fa-chart-line fa-3x"></i>
                <h2>Analytics</h2>
                <p>Track your website's performance with our analytics tools.</p>
            </div>
            <div className="feature">
                <i className="fas fa-cogs fa-3x"></i>
                <h2>Customization</h2>
                <p>Customize your website easily with our flexible options.</p>
            </div>
            <div className="feature">
                <i className="fas fa-lock fa-3x"></i>
                <h2>Security</h2>
                <p>Keep your data safe and secure with our advanced security measures.</p>
            </div>
        </div>
    );
}

export default FeatureSection;
