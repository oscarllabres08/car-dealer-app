import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if input is already an email (contains @), otherwise append @ojt.local
    const trimmedUsername = username.trim().toLowerCase();
    const emailFormat = trimmedUsername.includes('@') 
      ? trimmedUsername 
      : `${trimmedUsername}@ojt.local`;
    const { error: signInError } = await signIn(emailFormat, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800/95 backdrop-blur-md rounded-xl sm:rounded-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in border border-slate-700/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-fade-in stagger-1">
            <label className="block text-gray-300 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/80 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700 transition-all duration-300 border border-slate-600 hover:border-slate-500"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="animate-fade-in stagger-2">
            <label className="block text-gray-300 mb-2 font-medium">Password</label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-slate-700/80 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700 transition-all duration-300 border border-slate-600 hover:border-slate-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/50 backdrop-blur-sm border border-red-500 rounded-lg text-red-200 animate-fade-in-down">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 disabled:to-blue-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 animate-fade-in stagger-3"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          {onSwitchToRegister && (
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-blue-500 hover:text-blue-400 font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
