import { CheckCircle, TrendingUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface FinancingCalculatorResultsProps {
  results: {
    price: number;
    totalDP: number;
    amortizations: { months: number; amount: number }[];
  } | null;
}

export function FinancingCalculatorResults({
  results
}: FinancingCalculatorResultsProps) {
  const [copied, setCopied] = useState(false);

  if (!results) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20 flex items-center justify-center min-h-[220px]">
        <div className="text-center">
          <TrendingUp className="w-14 h-14 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 text-base sm:text-lg">
            Enter vehicle details to see payment options
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);

  const formatCurrencyPlain = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

  const getYearLabel = (months: number) => {
    const years = months / 12;
    if (years === 1) return '1 Year';
    if (months < 12) return `${months} Months`;
    return `${years} Years`;
  };

  const handleCopy = async () => {
    const amortByMonths: Record<number, number> = {};
    results.amortizations.forEach(({ months, amount }) => {
      amortByMonths[months] = amount;
    });

    let textToCopy = '';
    textToCopy += `Price:\n${formatCurrencyPlain(results.price)}\n\n`;
    textToCopy += `Total DP:\n${formatCurrencyPlain(results.totalDP)}\n\n`;

    const terms = [12, 24, 36, 48, 60];
    terms.forEach((months) => {
      const years = months / 12;
      const label =
        years === 1 ? '1 year Amortization:' : `${years} years Amortization:`;
      const value = amortByMonths[months] ? formatCurrencyPlain(amortByMonths[months]) : '';
      textToCopy += `${label}\n${value}\n\n`;
    });

    try {
      await navigator.clipboard.writeText(textToCopy.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          <h4 className="text-lg sm:text-2xl font-bold text-white truncate">
            Payment Breakdown
          </h4>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex-shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copied!</span>
              <span className="sm:hidden">Done</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="mb-6 sm:mb-8 p-5 sm:p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-400/30">
        <p className="text-sm text-slate-300 mb-1 font-medium">All-in Downpayment</p>
        <p className="text-3xl sm:text-4xl font-bold text-white">{formatCurrency(results.totalDP)}</p>
        <p className="text-xs text-slate-400 mt-2">
          Includes initial DP, chattel fee, and processing fee
        </p>
      </div>

      <div>
        <h5 className="text-base sm:text-lg font-semibold text-white mb-4">
          Monthly Amortization Options
        </h5>
        <div className="space-y-3">
          {results.amortizations.map(({ months, amount }) => (
            <div
              key={months}
              className="p-4 sm:p-5 bg-slate-800/40 rounded-xl border border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <p className="text-slate-300 text-sm font-medium mb-1">
                    {getYearLabel(months)}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {formatCurrency(amount)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-400">per month</p>
                  <p className="text-sm text-slate-300 font-medium mt-1">
                    {months} months
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 sm:mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <p className="text-xs text-slate-300 leading-relaxed">
          Monthly payments are based on GDFI financing terms. Actual rates may vary
          depending on credit assessment and approval.
        </p>
      </div>
    </div>
  );
}

