import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react';

const searchableItems = [
  { name: 'Humanizer', type: 'tool', path: '/tools?tool=Humanizer' },
  { name: 'Summarizer', type: 'tool', path: '/tools?tool=Summarizer' },
  { name: 'Rewriter', type: 'tool', path: '/tools?tool=Rewriter' },
  { name: 'Email Generator', type: 'tool', path: '/tools?tool=Email%20Generator' },
  { name: 'Explain Simple', type: 'tool', path: '/tools?tool=Explain%20Simple' },
  { name: 'Keyword Extractor', type: 'tool', path: '/tools?tool=Keyword%20Extractor' },
  { name: 'Code Converter', type: 'tool', path: '/tools?tool=Code%20Converter' },
  { name: 'JSON to CSV Converter', type: 'tool', path: '/tools?tool=JSON%20to%20CSV%20Converter' },
  { name: 'Dashboard', type: 'page', path: '/' },
  { name: 'History', type: 'page', path: '/history' },
  { name: 'Profile', type: 'page', path: '/profile' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 bg-surface/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-80 z-50">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search tools, history..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
        />
        
        {/* Search Results Dropdown */}
        {showResults && searchQuery.trim() && (
          <div className="absolute top-full left-0 mt-2 w-full py-2 rounded-xl bg-surface border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl z-50 max-h-80 overflow-auto">
            {searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
              searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setSearchQuery('');
                    setShowResults(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors text-left"
                >
                  <Search className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="font-medium truncate">{item.name}</span>
                    <span className="shrink-0 ml-2 text-[10px] uppercase tracking-wider text-indigo-400/80 border border-indigo-400/20 bg-indigo-400/10 px-1.5 py-0.5 rounded-md font-semibold">
                      {item.type}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-4 text-sm text-gray-500 text-center">
                No matching tools or pages found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-sm text-gray-300 font-medium hidden md:block">
              {user?.name || 'User'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-surface border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="px-4 py-2 border-b border-white/5">
                <p className="text-sm font-medium text-gray-200">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logoutUser}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400111 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
