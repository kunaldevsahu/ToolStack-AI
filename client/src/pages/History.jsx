import { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Sparkles,
  BookOpen,
  Pen,
  Mail,
  FileText,
  Wand2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Key,
  Code,
  FileJson,
} from 'lucide-react';

const toolIcons = {
  Humanizer: Sparkles,
  Summarizer: BookOpen,
  Rewriter: Pen,
  'Email Generator': Mail,
  'Explain Simple': FileText,
  'Keyword Extractor': Key,
  'Code Converter': Code,
  'JSON to CSV Converter': FileJson,
};

const toolColors = {
  Humanizer: 'from-pink-500 to-rose-600',
  Summarizer: 'from-blue-500 to-cyan-600',
  Rewriter: 'from-emerald-500 to-teal-600',
  'Email Generator': 'from-orange-500 to-amber-600',
  'Explain Simple': 'from-violet-500 to-purple-600',
  'Keyword Extractor': 'from-yellow-500 to-orange-500',
  'Code Converter': 'from-emerald-400 to-cyan-500',
  'JSON to CSV Converter': 'from-amber-500 to-orange-500',
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

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

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p className="text-gray-500 text-sm mt-1">
          {history.length} generation{history.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center mb-4">
            <Clock className="w-7 h-7 text-indigo-500/40" />
          </div>
          <p className="text-gray-400 text-sm">No generations yet</p>
          <p className="text-gray-600 text-xs mt-1">Your AI generation history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((h, i) => {
            const Icon = toolIcons[h.tool] || Wand2;
            const colorGradient = toolColors[h.tool] || 'from-indigo-500 to-purple-600';
            const isExpanded = expandedId === h._id;

            return (
              <motion.div
                key={h._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="glass-panel rounded-2xl overflow-hidden hover:bg-white/[0.03] transition-colors"
              >
                {/* Summary row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : h._id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-200">{h.tool}</p>
                      {h.tone && h.tone !== 'Neutral' && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-500 font-medium">
                          {h.tone}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{h.input?.slice(0, 100)}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[11px] text-gray-600 hidden sm:block">
                      {new Date(h.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 space-y-4 border-t border-white/5">
                        {/* Input */}
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Input</p>
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                            {h.input}
                          </div>
                        </div>
                        {/* Output */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Output</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(h.output, h._id);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 hover:text-gray-200 transition-all"
                            >
                              {copiedId === h._id ? (
                                <><Check className="w-3 h-3 text-emerald-400" /> Copied</>
                              ) : (
                                <><Copy className="w-3 h-3" /> Copy</>
                              )}
                            </button>
                          </div>
                          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {h.output}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
