import { useState } from 'react';
import { Percent, Calendar } from 'lucide-react';

interface CalculatorProps {
  onCalculate: (results: {
    price: number;
    totalDP: number;
    amortizations: { months: number; amount: number }[];
  }) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [price, setPrice] = useState('');
  const [dpPercent, setDpPercent] = useState('');
  const [yearModel, setYearModel] = useState<'2021-2025' | '2019-2020' | '2014-2018' | '2010-2013'>('2021-2025');

  const handleCalculate = () => {
    const srp = parseFloat(price);
    const dpRate = parseFloat(dpPercent) / 100;

    if (isNaN(srp) || isNaN(dpRate) || srp <= 0 || dpRate < 0) {
      return;
    }

    const dp = srp * dpRate;
    const loanAmount = srp - dp;

    let chatFeeRate = 0.055;
    let interestRates: { [key: number]: number } = {};
    let availableTerms: number[] = [];

    switch (yearModel) {
      case '2021-2025':
        chatFeeRate = 0.055;
        interestRates = {
          12: 0.0125,
          24: 0.0115,
          36: 0.0115,
          48: 0.012,
          60: 0.012
        };
        availableTerms = [12, 24, 36, 48, 60];
        break;
      case '2019-2020':
        chatFeeRate = 0.055;
        interestRates = {
          12: 0.01325,
          24: 0.01175,
          36: 0.01175,
          48: 0.013
        };
        // GDFI 2019-2020: up to 4 years term
        availableTerms = [12, 24, 36, 48];
        break;
      case '2014-2018':
        chatFeeRate = 0.07;
        interestRates = {
          12: 0.01325,
          24: 0.01225,
          36: 0.01225,
          48: 0.013
        };
        // GDFI 2014-2018: up to 4 years term
        availableTerms = [12, 24, 36, 48];
        break;
      case '2010-2013':
        chatFeeRate = 0.055;
        interestRates = {
          12: 0.014,
          24: 0.014,
          36: 0.014
        };
        // GDFI 2010-2013: up to 3 years term
        availableTerms = [12, 24, 36];
        break;
    }

    const chatFee = loanAmount * chatFeeRate;
    const totalDP = dp + chatFee + 15000;

    const amortizations = availableTerms.map(months => {
      const interest = loanAmount * interestRates[months];
      const mAmortization = (loanAmount / months) + interest;
      return { months, amount: mAmortization };
    });

    onCalculate({ price: srp, totalDP, amortizations });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Vehicle Details</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Vehicle Year Model
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={yearModel}
              onChange={(e) => setYearModel(e.target.value as any)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="2021-2025">2021-2025 (Latest Models)</option>
              <option value="2019-2020">2019-2020</option>
              <option value="2014-2018">2014-2018</option>
              <option value="2010-2013">2010-2013</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Vehicle Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg font-semibold">₱</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="500,000"
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Downpayment Percentage
          </label>
          <div className="relative">
            <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              value={dpPercent}
              onChange={(e) => setDpPercent(e.target.value)}
              placeholder="10"
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          Calculate Payment
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <p className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-100">Note:</span> Calculations include chattel fee and processing fee of ₱15,000. Interest rates vary based on vehicle year model and loan term.
        </p>
      </div>
    </div>
  );
}