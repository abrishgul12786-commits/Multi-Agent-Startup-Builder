import React, { useState, useEffect } from 'react';
import { StartupInput, StartupReport } from './types';
import { Navbar } from './components/Navbar';
import { StartupForm } from './components/StartupForm';
import { AgentOrchestrator } from './components/AgentOrchestrator';
import { ReportView } from './components/ReportView';
import { X, FolderClock, ArrowRight, Trash2, BrainCircuit } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<'form' | 'evaluating' | 'report'>('form');
  const [currentInput, setCurrentInput] = useState<StartupInput | null>(null);
  const [currentReport, setCurrentReport] = useState<StartupReport | null>(null);
  const [savedReports, setSavedReports] = useState<StartupReport[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load saved reports from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('startup_forge_saved_reports');
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved reports', e);
    }
  }, []);

  const handleSaveReport = (reportToSave: StartupReport) => {
    try {
      const exists = savedReports.some((r) => r.id === reportToSave.id);
      let updated: StartupReport[];
      if (exists) {
        updated = savedReports.filter((r) => r.id !== reportToSave.id);
      } else {
        updated = [reportToSave, ...savedReports];
      }
      setSavedReports(updated);
      localStorage.setItem('startup_forge_saved_reports', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save report', e);
    }
  };

  const handleDeleteSavedReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedReports.filter((r) => r.id !== id);
    setSavedReports(updated);
    localStorage.setItem('startup_forge_saved_reports', JSON.stringify(updated));
  };

  const handleFormSubmit = async (input: StartupInput) => {
    setCurrentInput(input);
    setErrorMsg(null);
    setViewState('evaluating');

    try {
      const res = await fetch('/api/analyze-startup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || errData.details || 'Failed to analyze startup idea.');
      }

      const reportData: StartupReport = await res.json();

      // Wait slightly so user sees the final agent coordination logs in orchestrator
      setTimeout(() => {
        setCurrentReport(reportData);
        setViewState('report');
      }, 1500);

    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(err?.message || 'Error communicating with AI executive agent backend.');
      setViewState('form');
    }
  };

  const handleNewAnalysis = () => {
    setCurrentReport(null);
    setCurrentInput(null);
    setErrorMsg(null);
    setViewState('form');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        onNewAnalysis={handleNewAnalysis}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={savedReports.length}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {errorMsg && (
          <div className="max-w-3xl mx-auto mt-6 px-4">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-sm flex items-center justify-between">
              <span>{errorMsg}</span>
              <button 
                onClick={() => setErrorMsg(null)}
                className="font-bold text-xs underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {viewState === 'form' && (
          <StartupForm onSubmit={handleFormSubmit} isLoading={false} />
        )}

        {viewState === 'evaluating' && (
          <AgentOrchestrator ideaName={currentInput?.idea || 'Startup Concept'} />
        )}

        {viewState === 'report' && currentReport && (
          <ReportView
            report={currentReport}
            onSaveReport={handleSaveReport}
            isSaved={savedReports.some((r) => r.id === currentReport.id)}
          />
        )}
      </main>

      {/* Saved Reports Drawer Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                  <FolderClock className="w-5 h-5 text-indigo-600" />
                  <span>Saved Startup Reports</span>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
                {savedReports.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <BrainCircuit className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-sm font-medium">No saved startup reports yet.</p>
                    <p className="text-xs">Run a multi-agent evaluation and click "Save Project".</p>
                  </div>
                ) : (
                  savedReports.map((saved) => (
                    <div
                      key={saved.id}
                      onClick={() => {
                        setCurrentReport(saved);
                        setViewState('report');
                        setIsHistoryOpen(false);
                      }}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-indigo-500 cursor-pointer transition-all group space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                          {new Date(saved.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                            Score: {saved.plan.viabilityScore}
                          </span>
                          <button
                            onClick={(e) => handleDeleteSavedReport(saved.id, e)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {saved.input.idea}
                      </h4>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
              Saved locally in browser storage
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        StartupForge AI • Multi-Agent Startup Evaluation Engine
      </footer>

    </div>
  );
}
