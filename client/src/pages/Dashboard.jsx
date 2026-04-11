import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  FileText,
  Wand2,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Pen,
  Mail,
  BookOpen,
  Smile,
  PenLine,
  AtSign,
  Contact,
  Key,
  Brain,
  Plus,
  Code,
  FileJson
} from 'lucide-react';

const toolIcons = {
  Humanizer: Smile,
  Summarizer: FileText,
  Rewriter: PenLine,
  'Email Generator': AtSign,
  'JSON to CSV Converter': FileJson,
  'Keyword Extractor': Key,
  'Explain Simple': Brain,
  'Code Converter': Code,
};

const quickActions = [
  { 
    label: 'Humanizer', 
    desc: 'Make AI text sound naturally human and bypass detection.',
    icon: Smile, 
    bgHover: 'hover:border-indigo-500/50',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400'
  },
  { 
    label: 'Summarizer', 
    desc: 'Condense long articles into key bullet points instantly.',
    icon: FileText, 
    bgHover: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400'
  },
  { 
    label: 'Rewriter', 
    desc: 'Paraphrase text while maintaining tone and context.',
    icon: PenLine, 
    bgHover: 'hover:border-rose-500/50',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400'
  },
  { 
    label: 'Email Generator', 
    desc: 'Draft professional emails for any situation in seconds.',
    icon: AtSign, 
    bgHover: 'hover:border-indigo-500/50',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400'
  },
  { 
    label: 'JSON to CSV Converter', 
    desc: 'Convert your JSON objects or arrays into formatted CSV data automatically.',
    icon: FileJson, 
    bgHover: 'hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400'
  },
  { 
    label: 'Keyword Extractor', 
    desc: 'Identify critical SEO terms from any piece of content.',
    icon: Key, 
    bgHover: 'hover:border-pink-500/50',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400'
  },
  { 
    label: 'Explain Simple', 
    desc: 'Break down complex topics for a 5th grade level.',
    icon: Brain, 
    bgHover: 'hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  { 
    label: 'Code Converter', 
    desc: 'Translate code snippets from one programming language to another.',
    icon: Code, 
    bgHover: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
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
  const activeTools = new Set(history.map((h) => h.tool)).size;

  const stats = [
    {
      label: 'Total Generations',
      value: totalGenerations,
      icon: Zap,
      color: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/20',
    },
    {
      label: 'Words Processed',
      value: wordsProcessed.toLocaleString(),
      icon: FileText,
      color: 'from-emerald-500 to-teal-500',
      glow: 'shadow-emerald-500/20',
    },
    {
      label: 'Active Tools',
      value: activeTools,
      icon: Wand2,
      color: 'from-orange-500 to-amber-500',
      glow: 'shadow-orange-500/20',
    },
    {
      label: 'This Week',
      value: history.filter(
        (h) => new Date(h.createdAt) > new Date(Date.now() - 7 * 86400000)
      ).length,
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      glow: 'shadow-pink-500/20',
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      {/* Welcome */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your AI tools today.</p>
        </div>
        <Link
          to="/tools"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
        >
          New Generation <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`glass-panel rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 shadow-lg ${s.glow}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{s.label}</span>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{loading ? '—' : s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <Link to="/tools" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            View all tools
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={`/tools?tool=${encodeURIComponent(a.label)}`}
              className={`glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:bg-white/[0.04] transition-all duration-300 ${a.bgHover}`}
            >
              <div className={`w-12 h-12 rounded-xl ${a.iconBg} flex items-center justify-center`}>
                <a.icon className={`w-5 h-5 ${a.iconColor}`} />
              </div>
              <div className="mt-2">
                <h3 className="text-base font-semibold text-white mb-2">{a.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed min-h-[40px]">{a.desc}</p>
              </div>
            </Link>
          ))}
          {/* More Tools Card */}
          {/* <Link
            to="/tools"
            className="glass-panel border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-sm font-bold text-gray-500 tracking-widest uppercase mt-2">More Tools</span>
          </Link> */}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <Link to="/history" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            View all
          </Link>
        </div>
        <div className="glass-panel rounded-2xl divide-y divide-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 flex justify-center">
              <div className="w-7 h-7 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">
              No activity yet. Start using the AI tools!
            </div>
          ) : (
            history.slice(0, 5).map((h) => {
              const Icon = toolIcons[h.tool] || Wand2;
              return (
                <div key={h._id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{h.tool}</p>
                    <p className="text-xs text-gray-500 truncate">{h.input?.slice(0, 80)}…</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {new Date(h.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
