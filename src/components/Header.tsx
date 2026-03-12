import { FileText, LogIn } from 'lucide-react';
import { FACEBOOK_PAGE_URL, INSTAGRAM_URL, MESSENGER_URL, X_URL } from '../lib/contact';

interface HeaderProps {
  onAdminClick: () => void;
  showAdminButton?: boolean;
}

function SocialIcon({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      title={title}
      className="grid place-items-center w-4 h-4 text-slate-200"
    >
      {children}
    </span>
  );
}

function FacebookIcon() {
  return (
    <SocialIcon title="Facebook">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    </SocialIcon>
  );
}

function MessengerIcon() {
  return (
    <SocialIcon title="Messenger">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2C6.49 2 2 6.14 2 11.25c0 2.91 1.46 5.5 3.75 7.19V22l3.4-1.87c.9.25 1.86.37 2.85.37 5.51 0 10-4.14 10-9.25S17.51 2 12 2Zm.99 12.45-2.55-2.73-4.95 2.73 5.44-5.78 2.58 2.73 4.92-2.73-5.44 5.78Z" />
      </svg>
    </SocialIcon>
  );
}

function XIcon() {
  return (
    <SocialIcon title="X">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.25l-4.9-7.1L5.9 22H2.8l7.25-8.29L.8 2h6.4l4.43 6.52L18.9 2Zm-1.1 18h1.72L7.1 3.9H5.26L17.8 20Z" />
      </svg>
    </SocialIcon>
  );
}

function InstagramIcon() {
  return (
    <SocialIcon title="Instagram">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.7 6.8a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
      </svg>
    </SocialIcon>
  );
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
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                title="Facebook Page"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 hover:border-slate-600 transition-all"
              >
                <FacebookIcon />
              </a>
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noreferrer"
                title="Messenger"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 hover:border-slate-600 transition-all"
              >
                <MessengerIcon />
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                title="X"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 hover:border-slate-600 transition-all"
              >
                <XIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 hover:border-slate-600 transition-all"
              >
                <InstagramIcon />
              </a>
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
      </div>
    </header>
  );
}
