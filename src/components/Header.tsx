import { FileText, LogIn } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  showAdminButton?: boolean;
}

export function Header({ onAdminClick, showAdminButton = true }: HeaderProps) {
  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800/50 shadow-lg animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <h1 className="text-base sm:text-lg md:text-2xl font-bold tracking-tight truncate bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Car Dealer
            </h1>
          </div>
          {showAdminButton && (
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base flex-shrink-0 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50"
            >
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="hidden sm:inline">Login / Register</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
