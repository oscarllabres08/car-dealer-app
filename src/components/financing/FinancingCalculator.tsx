import { useState } from 'react';
import { Car } from 'lucide-react';
import { FinancingCalculatorForm } from './FinancingCalculatorForm';
import { FinancingCalculatorResults } from './FinancingCalculatorResults';

type FinancingResults = {
  price: number;
  totalDP: number;
  amortizations: { months: number; amount: number }[];
};

export function FinancingCalculator() {
  const [results, setResults] = useState<FinancingResults | null>(null);

  return (
    <section className="animate-fade-in">
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-2xl shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
              Financing Calculator
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              Calculate all-in DP and monthly amortization.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <FinancingCalculatorForm onCalculate={setResults} />
        <FinancingCalculatorResults results={results} />
      </div>
    </section>
  );
}

