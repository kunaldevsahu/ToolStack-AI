import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../services/api';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Zap,
  FileText,
  Wand2,
  Sparkles,
  BookOpen,
  Pen,
  TrendingUp,
  Key,
  Code,
  FileJson,
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getHistory();
        setHistory(data);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalGenerations = history.length;
  const wordsProcessed = history.reduce(
    (acc, h) => acc + (h.input?.split(/\s+/).length || 0) + (h.output?.split(/\s+/).length || 0),
    0
  );
  const toolUsage = history.reduce((acc, h) => {
    acc[h.tool] = (acc[h.tool] || 0) + 1;
    return acc;
  }, {});

  const toolEntries = Object.entries(toolUsage).sort((a, b) => b[1] - a[1]);

  const toolIconMap = {
    Humanizer: Sparkles,
    Summarizer: BookOpen,
    Rewriter: Pen,
    'Email Generator': Mail,
    'Explain Simple': FileText,
    'Keyword Extractor': Key,
    'Code Converter': Code,
    'JSON to CSV Converter': FileJson,
  };

  const toolColorMap = {
    Humanizer: 'from-pink-500 to-rose-600',
    Summarizer: 'from-blue-500 to-cyan-600',
    Rewriter: 'from-emerald-500 to-teal-600',
    'Email Generator': 'from-orange-500 to-amber-600',
    'Explain Simple': 'from-violet-500 to-purple-600',
    'Keyword Extractor': 'from-yellow-500 to-orange-500',
    'Code Converter': 'from-emerald-400 to-cyan-500',
    'JSON to CSV Converter': 'from-amber-500 to-orange-500',
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      {/* Profile card */}
      <motion.div variants={item} className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-indigo-500/30">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {user?.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Usage stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Generations', value: totalGenerations, icon: Zap, color: 'from-indigo-500 to-purple-500' },
          { label: 'Words Processed', value: wordsProcessed.toLocaleString(), icon: FileText, color: 'from-emerald-500 to-teal-500' },
          { label: 'Favorite Tool', value: toolEntries[0]?.[0] || '—', icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
        ].map((s) => (
          <div key={s.label} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{loading ? '—' : s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Tool usage breakdown */}
      <motion.div variants={item} className="glass-panel rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Tool Usage</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : toolEntries.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No usage data yet.</p>
        ) : (
          <div className="space-y-4">
            {toolEntries.map(([tool, count]) => {
              const Icon = toolIconMap[tool] || Wand2;
              const color = toolColorMap[tool] || 'from-indigo-500 to-purple-600';
              const pct = Math.round((count / totalGenerations) * 100);
              return (
                <div key={tool} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{tool}</span>
                    </div>
                    <span className="text-xs text-gray-500">{count} uses ({pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
