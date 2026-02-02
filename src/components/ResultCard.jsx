import React from 'react';
import './ResultCard.css';

export default function ResultCard({ 
    dscr, 
    rentalIncome, 
    totalExpenses, 
    netIncome, 
    principalAndInterest, 
    monthlyTaxes, 
    monthlyInsurance 
}) {
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

    const formatCurrency = (val) => '$' + val.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});

    return (
        <div className="card result-card" style={{borderColor: statusColor}}>
            <div className="dscr-header">
                <h3 style={{color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase'}}>DSCR Score</h3>
                <div className="badge" style={{backgroundColor: statusColor, color: '#000'}}>
                    {statusText}
                </div>
            </div>
            
            <div className="dscr-value" style={{color: statusColor}}>
                {dscr.toFixed(2)}x
            </div>
            
            <div className="breakdown">
                <div className="breakdown-row income">
                    <span>Rental Income</span>
                    <span className="amount positive">{formatCurrency(rentalIncome)}</span>
                </div>
                
                <div className="breakdown-section">
                    <div className="breakdown-row expenses-total">
                        <span>Total Expenses</span>
                        <span className="amount negative">-{formatCurrency(totalExpenses)}</span>
                    </div>
                    <div className="sub-breakdown">
                        <div className="sub-row">
                            <span>Mortgage (P&I)</span>
                            <span>{formatCurrency(principalAndInterest)}</span>
                        </div>
                        <div className="sub-row">
                            <span>Taxes</span>
                            <span>{formatCurrency(monthlyTaxes)}</span>
                        </div>
                        <div className="sub-row">
                            <span>Insurance</span>
                            <span>{formatCurrency(monthlyInsurance)}</span>
                        </div>
                    </div>
                </div>

                <div className="breakdown-row net-income">
                    <span>Net Cashflow</span>
                    <span className={`amount ${netIncome >= 0 ? 'positive' : 'negative'}`}>
                        {netIncome >= 0 ? '+' : ''}{formatCurrency(netIncome)}
                    </span>
                </div>
            </div>
        </div>
    );
}
