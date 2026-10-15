import React, { useState } from 'react';
import { X, Calculator, IndianRupee } from 'lucide-react';
import { Property } from '../data/propertiesData';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface LoanEstimateModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const LoanEstimateModal: React.FC<LoanEstimateModalProps> = ({ property, isOpen, onClose }) => {
  // Approximate price in Lakhs
  const initialPriceInLakhs = Math.max(25, Math.round(property.priceNum * 100));
  const [totalPriceLakhs, setTotalPriceLakhs] = useState(initialPriceInLakhs);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  if (!isOpen) return null;

  const loanAmountLakhs = totalPriceLakhs * (1 - downPaymentPercent / 100);
  const loanPrincipal = loanAmountLakhs * 100000;
  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyEmi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
  );
  const totalPayment = monthlyEmi * numberOfMonths;
  const totalInterest = totalPayment - loanPrincipal;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-800 focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#fdf5eb] text-[#d4a359] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a359] block leading-none">
              INSTANT CALCULATOR
            </span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">Home Loan & EMI Estimate</h3>
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          {property.title} · {property.location} (Listing Price: {property.price})
        </p>

        {/* EMI Result Card */}
        <div className="bg-[#071426] text-white rounded-2xl p-4.5 mb-6 shadow-md">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
            ESTIMATED MONTHLY EMI
          </span>
          <div className="text-3xl font-extrabold text-[#e5b268] tracking-tight">
            {formatCurrency(monthlyEmi)}
            <span className="text-xs font-normal text-slate-300 ml-1">/ month</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-400 block">Loan Amount</span>
              <span className="font-bold text-slate-200">{formatCurrency(loanPrincipal)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Down Payment</span>
              <span className="font-bold text-slate-200">
                {formatCurrency((totalPriceLakhs * downPaymentPercent * 100000) / 100)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Interest</span>
              <span className="font-bold text-[#e5b268]">{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4 text-xs font-medium text-slate-700">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Property Valuation:</span>
              <span className="font-bold text-slate-900">₹ {totalPriceLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min={30}
              max={1000}
              step={5}
              value={totalPriceLakhs}
              onChange={(e) => setTotalPriceLakhs(Number(e.target.value))}
              className="w-full accent-[#d4a359]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Down Payment ({downPaymentPercent}%):</span>
              <span className="font-bold text-slate-900">
                ₹ {((totalPriceLakhs * downPaymentPercent) / 100).toFixed(1)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#d4a359]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Interest Rate:</span>
              <span className="font-bold text-slate-900">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={7.5}
              max={12.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#d4a359]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span>Loan Tenure:</span>
              <span className="font-bold text-slate-900">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-[#d4a359]"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 leading-tight">
            *Indicative estimates based on standard bank lending rates (SBI, HDFC, ICICI, PNB).
          </p>
          <a
            href={CONTACT_CONFIG.getWhatsAppLink(property.title, `Home Loan assistance for ${formatCurrency(monthlyEmi)}/month EMI`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#071426] text-white text-xs font-bold whitespace-nowrap hover:bg-[#0c1e34] transition"
          >
            Apply for Bank Loan
          </a>
        </div>
      </div>
    </div>
  );
};
