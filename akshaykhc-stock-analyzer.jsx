import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Target, ShieldCheck, 
  Users, Briefcase, Building2, AlertTriangle, CheckCircle2, 
  Search, BarChart3, Award, ExternalLink, ArrowUpRight, ArrowDownRight,
  HelpCircle, Scale, Terminal
} from 'lucide-react';

export default function StockAnalysisApp() {
  const [ticker, setTicker] = useState('NVDA');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(getMockStockData('NVDA'));

  function handleSearch(e) {
    e.preventDefault();
    if (!ticker.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setData(getMockStockData(ticker.toUpperCase()));
      setLoading(false);
    }, 600);
  }

  function handlePreset(sym) {
    setTicker(sym);
    setLoading(true);
    setTimeout(() => {
      setData(getMockStockData(sym));
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Akshaykhc’s Stock Analyzer</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">Autonomous Institutional Equity Research & Valuation Engine</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter ticker (e.g. NVDA, AAPL, TSLA)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </form>
      </header>

      {/* Quick Ticker Presets */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Quick Load:</span>
        {['NVDA', 'AAPL', 'AMZN', 'TSLA', 'AMD', 'IONQ', 'RGTI', 'QBTS'].map((sym) => (
          <button
            key={sym}
            onClick={() => handlePreset(sym)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors shrink-0 ${
              ticker.toUpperCase() === sym 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            ${sym}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse">Synthesizing live filings, P/E multiples, competitor