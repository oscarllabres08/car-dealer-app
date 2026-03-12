import { CheckCircle, TrendingUp, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultsProps {
  results: {
    price: number;
    totalDP: number;
    amortizations: { months: number; amount: number }[];
  } | null;
}

export function Results({ results }: ResultsProps) {
  const [copied, setCopied] = useState(false);

  if (!results) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">
            Enter vehicle details to see payment options
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatCurrencyPlain = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getYearLabel = (months: number) => {
    const years = months / 12;
    if (years === 1) return '1 Year';
    if (months < 12) return `${months} Months`;
    return `${years} Years`;
  };

  const handleCopy = async () => {
    // Map amortizations by term for quick lookup
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
        years === 1
          ? '1 year Amortization:'
          : `${years} years Amortization:`;

      const value = amortByMonths[months]
        ? formatCurrencyPlain(amortByMonths[months])
        : '';

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
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Payment Breakdown</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-400/30">
        <p className="text-sm text-slate-300 mb-1 font-medium">All-in Downpayment</p>
        <p className="text-4xl font-bold text-white">
          {formatCurrency(results.totalDP)}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Includes initial DP, chattel fee, and processing fee
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Amortization Options</h3>
        <div className="space-y-3">
          {results.amortizations.map(({ months, amount }) => (
            <div
              key={months}
              className="p-5 bg-slate-800/40 rounded-xl border border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-300 text-sm font-medium mb-1">
                    {getYearLabel(months)}
                  </p>
                  <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {formatCurrency(amount)}
                  </p>
                </div>
                <div className="text-right">
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

      <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <p className="text-xs text-slate-300 leading-relaxed">
          Monthly payments are based on GDFI financing terms. Actual rates may vary depending on credit assessment and approval.
        </p>
      </div>
    </div>
  );
}