import React from 'react';
import './ResultCard.css';

export default function ResultCard({ dscr, monthlyPayment, netIncome }) {
    let statusColor = 'var(--text-secondary)';
    let statusText = 'Neutral';
    
    if (dscr >= 1.25) {
        statusColor = 'var(--primary-color)';
        statusText = 'Excellent';
    } else if (dscr >= 1.0) {
        statusColor = 'var(--warning-color)';
        statusText = 'Risky';
    } else {
        statusColor = 'var(--error-color)';
        statusText = 'Negative Cashflow';
    }

    return (
        <div className="card result-card" style={{borderColor: statusColor}}>
            <h3 style={{color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase'}}>DSCR Score</h3>
            <div className="dscr-value" style={{color: statusColor}}>
                {dscr.toFixed(2)}x
            </div>
            <div className="badge" style={{backgroundColor: statusColor, color: '#000'}}>
                {statusText}
            </div>
            
            <div className="breakdown">
                <div className="breakdown-item">
                    <span>Net Income</span>
                    <span>${netIncome.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span>Debt Service</span>
                    <span>${monthlyPayment.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
