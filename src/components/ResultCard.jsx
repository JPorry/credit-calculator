import React from 'react';
import './ResultCard.css';

export default function ResultCard({ 
    dscr, 
    rentalIncome, 
    totalExpenses, 
    netIncome, 
    principalAndInterest, 
    monthlyTaxes, 
    monthlyInsurance,
    extraExpenses,
    moneyStuck = 0,
    paybackMonths = 0
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
    
    // Format payback time
    let paybackDisplay = 'Never';
    if (paybackMonths !== Infinity && paybackMonths > 0) {
        if (paybackMonths < 12) {
            paybackDisplay = `${paybackMonths.toFixed(1)} Months`;
        } else {
            const years = paybackMonths / 12;
            paybackDisplay = `${years.toFixed(1)} Years`;
        }
    } else if (paybackMonths <= 0 && moneyStuck > 0) {
        paybackDisplay = 'Never (Negative Cashflow)';
    } else if (moneyStuck <= 0) {
        paybackDisplay = 'Immediate (No Money Stuck)';
    }

    return (
        <div className="card result-card" style={{borderColor: statusColor}}>
            <div className="dscr-header">
                <span className="dscr-label">DSCR SCORE</span>
                <span className="dscr-value" style={{color: statusColor}}>{dscr.toFixed(2)}x</span>
            </div>
            <div className="dscr-status-badge" style={{backgroundColor: statusColor, color: '#000'}}>
                {statusText}
            </div>
            
            <div className="breakdown">
                <div className="breakdown-row income">
                    <span className="label">Rental Income</span>
                    <span className="amount positive">{formatCurrency(rentalIncome)}</span>
                </div>
                
                <div className="breakdown-row expenses-total">
                    <span className="label">Total Expenses</span>
                    <span className="amount negative">-{formatCurrency(totalExpenses)}</span>
                </div>

                <div className="divider"></div>

                <div className="breakdown-row net-income">
                    <span className="label">Net Cashflow</span>
                    <span className={`amount ${netIncome >= 0 ? 'positive' : 'negative'}`}>
                        {netIncome >= 0 ? '+' : ''}{formatCurrency(netIncome)}
                    </span>
                </div>

                {/* Investment Recovery Section */}
                <div className="investment-metrics">
                    <div className="metric-row">
                        <span className="label">Money Stuck</span>
                        <span className="amount">{formatCurrency(moneyStuck)}</span>
                    </div>
                    {moneyStuck > 0 && (
                        <div className="metric-row">
                            <span className="label">Time to Recapture*</span>
                            <span className="amount">{paybackDisplay}</span>
                        </div>
                    )}
                    {moneyStuck > 0 && <div className="metric-note">*Includes 10% income buffer</div>}
                </div>
            </div>
        </div>
    );
}
