import React from 'react';
import { Bot, Sparkles, FolderClock, PlusCircle, BrainCircuit } from 'lucide-react';

interface NavbarProps {
  onNewAnalysis: () => void;
  onOpenHistory: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewAnalysis,
  onOpenHistory,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
                StartupForge
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Multi-Agent AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              7 Executive AI Agents Collaborative Analysis
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHistory}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Saved Startup Reports"
          >
            <FolderClock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Saved Reports</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-xs font-bold bg-indigo-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewAnalysis}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Idea</span>
          </button>
        </div>

      </div>
    </header>
  );
};
