import React, { useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import InputGroup from './InputGroup';
import ResultCard from './ResultCard';

export default function Calculator() {
    // State
    const [propertyCost, setPropertyCost] = useLocalStorage('dscr_propertyCost', 200000);
    const [rehabCost, setRehabCost] = useLocalStorage('dscr_rehabCost', 50000);
    const [arv, setArv] = useLocalStorage('dscr_arv', 350000); // Default ARV
    
    const [interestRate, setInterestRate] = useLocalStorage('dscr_interestRate', 6.75);
    const [ltv, setLtv] = useLocalStorage('dscr_ltv', 75); // Loan to Value %
    
    const [rentalIncome, setRentalIncome] = useLocalStorage('dscr_rentalIncome', 2500);
    const [taxes, setTaxes] = useLocalStorage('dscr_taxes', 3000); // Annual
    const [insurance, setInsurance] = useLocalStorage('dscr_insurance', 1200); // Annual
    const [extraExpenses, setExtraExpenses] = useLocalStorage('dscr_extraExpenses', 0); // Monthly

    // Calculations
    const calculations = useMemo(() => {
        const totalCost = propertyCost + rehabCost;
        const loanAmount = arv * (ltv / 100);
        const downPayment = totalCost - loanAmount;
        
        // Mortgage PMT (Principal + Interest)
        const r = interestRate / 100 / 12;
        const n = 30 * 12; // 30 Years
        
        let pmt = 0;
        if (interestRate > 0) {
            pmt = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        } else {
            pmt = loanAmount / n;
        }

        const monthlyTaxes = taxes / 12;
        const monthlyInsurance = insurance / 12;
        
        const totalDebtService = pmt + monthlyTaxes + monthlyInsurance + extraExpenses;
        const netIncome = rentalIncome - totalDebtService;
        const dscr = totalDebtService > 0 ? rentalIncome / totalDebtService : 0;

        return {
            dscr,
            totalDebtService,
            netIncome,
            loanAmount,
            totalInvested: downPayment,
            principalAndInterest: pmt,
            monthlyTaxes,
            monthlyInsurance,
            extraExpenses
        };
    }, [propertyCost, rehabCost, arv, interestRate, ltv, rentalIncome, taxes, insurance, extraExpenses]);

    return (
        <div style={{width: '100%'}}>
            <ResultCard 
                dscr={calculations.dscr} 
                rentalIncome={rentalIncome}
                totalExpenses={calculations.totalDebtService}
                netIncome={calculations.netIncome}
                principalAndInterest={calculations.principalAndInterest}
                monthlyTaxes={calculations.monthlyTaxes}
                monthlyInsurance={calculations.monthlyInsurance}
                extraExpenses={calculations.extraExpenses}
            />
            
            <div className="card">
                <h3>Property Details</h3>
                <InputGroup 
                    label="Property Cost" 
                    value={propertyCost} 
                    onChange={setPropertyCost} 
                    min={50000} 
                    max={1000000} 
                    step={5000} 
                    description="The purchase price of the property."
                />
                <InputGroup 
                    label="Rehab Cost" 
                    value={rehabCost} 
                    onChange={setRehabCost} 
                    min={0} 
                    max={200000} 
                    step={1000} 
                    description="Estimated cost of renovations and repairs needed."
                />
            </div>

            <div className="card">
                <h3>Loan Details</h3>
                <InputGroup 
                    label="ARV (After Repair Value)" 
                    value={arv} 
                    onChange={setArv} 
                    min={50000} 
                    max={2000000} 
                    step={5000} 
                    description="Estimated value of the property after all renovations are completed."
                />
                <InputGroup 
                    label="Loan % (LTV)" 
                    value={ltv} 
                    onChange={setLtv} 
                    min={50} 
                    max={90} 
                    step={5} 
                    prefix="" 
                    suffix="%" 
                    description="Loan-to-Value ratio. Percentage of the ARV financed."
                />
                <InputGroup 
                    label="Interest Rate (%)" 
                    value={interestRate} 
                    onChange={setInterestRate} 
                    min={3} 
                    max={12} 
                    step={0.125} 
                    prefix="" 
                    suffix="%" 
                    description="Annual interest rate for the loan."
                />
                 <div style={{textAlign: 'center', opacity: 0.6, fontSize: '0.8rem', marginTop: '10px', marginBottom: '10px'}}>
                    Loan Amount: ${calculations.loanAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </div>
            </div>

            <div className="card">
                <h3>Income & Expenses</h3>
                <InputGroup 
                    label="Monthly Rent" 
                    value={rentalIncome} 
                    onChange={setRentalIncome} 
                    min={500} 
                    max={10000} 
                    step={50} 
                    description="Gross monthly rental income expected."
                />
                <InputGroup 
                    label="Annual Taxes" 
                    value={taxes} 
                    onChange={setTaxes} 
                    min={500} 
                    max={20000} 
                    step={100} 
                    description="Total property taxes for the year."
                />
                <InputGroup 
                    label="Annual Insurance" 
                    value={insurance} 
                    onChange={setInsurance} 
                    min={300} 
                    max={5000} 
                    step={50} 
                    description="Total hazard insurance cost for the year."
                />
                <InputGroup 
                    label="Extra Expenses (Monthly)" 
                    value={extraExpenses} 
                    onChange={setExtraExpenses} 
                    min={0} 
                    max={5000} 
                    step={50} 
                    description="Any additional monthly costs (HOA, Management, etc)."
                />
            </div>
        </div>
    );
}
