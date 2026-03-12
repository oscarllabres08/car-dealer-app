import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Results } from './components/Results';
import { Car } from 'lucide-react';

function App() {
  const [results, setResults] = useState<{
    totalDP: number;
    amortizations: { months: number; amount: number }[];
  } | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzJhNGE2YSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 pointer-events-none">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Car Financing Calculator
          </h1>
          <p className="text-slate-300 text-lg">
            Calculate monthly payments and downpayment 
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <Calculator onCalculate={setResults} />
          <Results results={results} />
        </div>

        <footer className="text-center mt-12 text-slate-400 text-sm">
          <p>CALCULATOR</p>
        </footer>
      </div>

      {/* Premium upgrade overlay */}
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-3xl bg-slate-900/95 border border-slate-700 shadow-2xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Upgrade to Premium
          </h2>
          <p className="mb-6 text-sm text-slate-300">
            The Developer must upgrade to premium to continue using the site.
          </p>
          <button
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg cursor-not-allowed opacity-80"
            disabled
          >
            Upgrade Required
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
