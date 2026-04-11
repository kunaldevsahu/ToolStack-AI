import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateText } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Pen,
  Mail,
  FileText,
  Copy,
  Check,
  RefreshCw,
  ChevronDown,
  Wand2,
  Loader2,
  Key,
  Code,
  FileJson,
  Download,
} from 'lucide-react';

const tools = [
  { 
    value: 'Humanizer', 
    icon: Sparkles, 
    desc: 'Make AI text sound human',
    about: 'Transforms robotic-sounding AI generated text into natural, conversational, human-like language that bypasses AI detectors.',
    usage: 'Paste your ChatGPT or AI-generated text into the input field and hit generate. The output will be rewritten to flow naturally.'
  },
  { 
    value: 'Summarizer', 
    icon: BookOpen, 
    desc: 'Condense long text',
    about: 'Quickly extracts the most important points and core message from lengthy articles, documents, or reports.',
    usage: 'Paste a long article or document (up to several pages) into the input box to instantly get a concise bulleted summary.'
  },
  { 
    value: 'Rewriter', 
    icon: Pen, 
    desc: 'Rewrite with a new tone',
    about: 'Paraphrases your existing text to improve clarity, fix grammar, and adjust the tone without changing the original meaning.',
    usage: 'Select your desired tone (e.g. Professional, Casual), paste your text, and let the AI rewrite it to perfectly match the mood.'
  },
  { 
    value: 'Email Generator', 
    icon: Mail, 
    desc: 'Draft professional emails',
    about: 'Instantly drafts complete, articulate emails based on a short description of what you want to say.',
    usage: 'Simply type a few words about what the email should be about (e.g. "ask for a deadline extension until Friday") and hit generate.'
  },
  { 
    value: 'Explain Simple', 
    icon: FileText, 
    desc: 'Simplify complex topics',
    about: 'Breaks down highly technical, academic, or complex jargon into simple terms that a 5th grader could understand.',
    usage: 'Enter any complex concept, medical term, or complicated paragraph. The AI will explain it using simple analogies.'
  },
  { 
    value: 'Keyword Extractor', 
    icon: Key, 
    desc: 'Identify critical SEO terms',
    about: 'Scans your content and identifies the most important SEO keywords, primary topics, and underlying themes.',
    usage: 'Paste a blog post or webpage content to extract a comma-separated list of the most critical keywords for SEO.'
  },
  { 
    value: 'Code Converter', 
    icon: Code, 
    desc: 'Convert code to another language',
    about: 'Translates functional code snippets from one programming language into another while preserving the core logic.',
    usage: 'Select your target language from the dropdown, paste your source code, and receive the equivalent code translated.'
  },
  { 
    value: 'JSON to CSV Converter', 
    icon: FileJson, 
    desc: 'Convert JSON to CSV format',
    about: 'Transforms structural JSON objects or arrays of objects into properly formatted CSV data.',
    usage: 'Paste your raw JSON text into the input field and hit generate. You can then download the resulting CSV.'
  },
];

const tones = ['Professional', 'Casual', 'Formal', 'Friendly', 'Academic'];
const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift'];

export default function AIToolPage() {
  const [searchParams] = useSearchParams();
  const [selectedTool, setSelectedTool] = useState(searchParams.get('tool') || 'Humanizer');
  const [tone, setTone] = useState('Professional');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [toolDropdownOpen, setToolDropdownOpen] = useState(false);

  useEffect(() => {
    const t = searchParams.get('tool');
    if (t && tools.some((tool) => tool.value === t)) {
      setSelectedTool(t);
      if (t === 'Code Converter') setTone('Python');
      else setTone('Professional');
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const { data } = await generateText({ tool: selectedTool, input, tone });
      setOutput(data.result);
    } catch (err) {
      setError(err.response?.data?.msg || 'Generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentTool = tools.find((t) => t.value === selectedTool) || tools[0];
  const CurrentIcon = currentTool.icon;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Tool selector */}
        <div className="relative">
          <button
            onClick={() => setToolDropdownOpen(!toolDropdownOpen)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-panel hover:bg-white/[0.06] transition-all text-sm"
          >
            <CurrentIcon className="w-4 h-4 text-indigo-400" />
            <span className="text-gray-200 font-medium">{selectedTool}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <AnimatePresence>
            {toolDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-2 w-64 py-2 rounded-xl bg-surface border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl z-50"
              >
                {tools.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setSelectedTool(t.value);
                      if (t.value === 'Code Converter') setTone('Python');
                      else setTone('Professional');
                      setToolDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      selectedTool === t.value
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-medium">{t.value}</p>
                      <p className="text-xs text-gray-600">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tone selector */}
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface/50 backdrop-blur-xl border border-white/5 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 appearance-none cursor-pointer"
          style={{ backgroundImage: 'none' }}
        >
          {selectedTool === 'Code Converter' 
            ? languages.map((l) => (
                <option key={l} value={l} className="bg-surface text-gray-300">
                  {l}
                </option>
              ))
            : tones.map((t) => (
                <option key={t} value={t} className="bg-surface text-gray-300">
                  {t}
                </option>
              ))}
        </select>

        {/* Word count */}
        <span className="text-xs text-gray-600 ml-auto">
          {input.trim() ? input.trim().split(/\s+/).length : 0} words
        </span>
      </div>

      {/* Tool Info Card */}
      <motion.div
        key={selectedTool}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="glass-panel rounded-2xl p-5 border border-indigo-500/10 bg-indigo-500/[0.02]"
      >
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
            <CurrentIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 mb-1">{currentTool.value}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{currentTool.about}</p>
            <div className="flex items-start gap-2.5 text-xs text-gray-500 bg-black/20 p-3 rounded-xl border border-white/5">
               <span className="font-semibold text-indigo-400/90 uppercase tracking-wider text-[10px] mt-0.5 whitespace-nowrap">How to use:</span>
               <span className="leading-relaxed">{currentTool.usage}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[500px]">
        {/* Input panel */}
        <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Input</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type your text here..."
            className="flex-1 w-full p-5 bg-transparent text-gray-200 text-sm leading-relaxed placeholder-gray-600 resize-none focus:outline-none"
          />
          <div className="px-5 py-3 border-t border-white/5 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output panel */}
        <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${output ? 'bg-indigo-500' : 'bg-gray-600'}`} />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Output</span>
            </div>
            {output && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectedTool === 'JSON to CSV Converter' && (
                  <button
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-xs text-amber-400 hover:text-amber-300 transition-all border border-amber-500/20"
                  >
                    <Download className="w-3 h-3" />
                    Download CSV
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-gray-200 transition-all"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-gray-200 transition-all disabled:opacity-40"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-5 overflow-auto">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-indigo-500/20 rounded-full" />
                  <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-indigo-500 rounded-full animate-spin" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm text-gray-300">AI is writing...</p>
                  <p className="text-xs text-gray-600">Using {selectedTool} tool</p>
                </div>
              </div>
            ) : output ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
              >
                {output}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-indigo-500/50" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">AI output will appear here</p>
                  <p className="text-xs text-gray-600 mt-1">Select a tool, enter text, and hit Generate</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast for copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2 shadow-xl backdrop-blur-xl z-50"
          >
            <Check className="w-4 h-4" /> Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
