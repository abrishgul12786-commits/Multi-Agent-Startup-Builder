import React, { useState } from 'react';
import { StartupInput } from '../types';
import { PRESET_TEMPLATES, AGENT_ROSTER } from '../data/templates';
import { 
  Sparkles, 
  Rocket, 
  Users, 
  Globe, 
  DollarSign, 
  Target, 
  Lightbulb, 
  Bot, 
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface StartupFormProps {
  onSubmit: (input: StartupInput) => void;
  isLoading: boolean;
}

export const StartupForm: React.FC<StartupFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StartupInput>({
    idea: '',
    targetAudience: '',
    countryMarket: '',
    budget: '',
    goals: ''
  });

  const handlePresetSelect = (templateData: StartupInput) => {
    setFormData(templateData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 px-4">
      {/* Hero Intro Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Agent AI Startup Builder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Turn Your Startup Idea Into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500">Executive Report</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          7 specialized AI agents (CEO, Market Research, Competitors, Business Model, Marketing, Finance, and Risk) evaluate your concept and produce an actionable plan.
        </p>
      </div>

      {/* Preset Starter Ideas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Or Try a Sample Startup Preset:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handlePresetSelect(tmpl.data)}
              className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
                  {tmpl.category}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {tmpl.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {tmpl.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Startup Parameters & Vision
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Provide details for the AI Executive Agent team to analyze
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Idea (Required) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Startup Idea <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.idea}
                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                placeholder="Describe your startup concept, core product, or problem you are solving..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Grid 2x2 for parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Target Audience */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="e.g. Small business owners, Gen Z fitness enthusiasts..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Country / Market */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  Target Country / Market
                </label>
                <input
                  type="text"
                  value={formData.countryMarket}
                  onChange={(e) => setFormData({ ...formData, countryMarket: e.target.value })}
                  placeholder="e.g. United States & Canada, European Union..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-teal-500" />
                  Initial Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. $15,000 bootstrap, $100k seed funding..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Founder Goals */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-500" />
                  Primary Goals
                </label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="e.g. Reach 100 paying subscribers, validate product-market fit..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

            </div>

            {/* Agent Roster Preview Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-indigo-500" />
                  7 AI Agents Standing By:
                </span>
                <span className="text-[11px] text-slate-500">Autonomous Evaluation Team</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {AGENT_ROSTER.map((agent) => (
                  <div 
                    key={agent.role}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1"
                  >
                    <div className="text-xl">{agent.avatar}</div>
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                      {agent.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 capitalize truncate">
                      {agent.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.idea.trim()}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-base"
            >
              <Rocket className="w-5 h-5 animate-bounce" />
              <span>{isLoading ? 'Dispatching AI Agents...' : 'Run Multi-Agent Startup Evaluation'}</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
