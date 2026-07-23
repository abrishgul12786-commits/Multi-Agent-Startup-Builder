import React, { useEffect, useState } from 'react';
import { AGENT_ROSTER } from '../data/templates';
import { AgentLog, AgentRole } from '../types';
import { 
  Bot, 
  Terminal, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

interface AgentOrchestratorProps {
  ideaName: string;
  onFinishedSimulatedLogs?: () => void;
}

export const AgentOrchestrator: React.FC<AgentOrchestratorProps> = ({ ideaName }) => {
  const [activeRole, setActiveRole] = useState<AgentRole>('ceo');
  const [completedRoles, setCompletedRoles] = useState<AgentRole[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    // Simulated sequence of agent chatter while backend request is in progress
    const steps: Array<{
      role: AgentRole;
      message: string;
      delay: number;
    }> = [
      { role: 'ceo', message: `Ingested proposal: "${ideaName.slice(0, 50)}...". Formatting execution plan and assigning task mandates.`, delay: 800 },
      { role: 'ceo', message: 'Assigned Market Research, Competitor, Business Model, Marketing, Finance, and Risk tasks.', delay: 1800 },
      { role: 'market', message: 'Analyzing target audience persona, demographics, and pain points...', delay: 2800 },
      { role: 'market', message: 'Calculated TAM/SAM/SOM market sizing & key industry macro drivers.', delay: 3800 },
      { role: 'competitor', message: 'Scouting top direct & indirect competitors. Mapping feature gap matrix...', delay: 4800 },
      { role: 'business', message: 'Formulating 9-box Business Model Canvas & constructing subscription pricing tiers...', delay: 5800 },
      { role: 'marketing', message: 'Devising brand identity, 3-phase GTM launch strategy, and social media viral hooks...', delay: 6800 },
      { role: 'finance', message: 'Modeling startup setup expenses, monthly OPEX, and calculating break-even month...', delay: 7800 },
      { role: 'risk', message: 'Auditing regulatory safeguards, tech risks, and drafting mitigation protocols...', delay: 8800 },
      { role: 'ceo', message: 'All agent outputs collected. Consolidating master executive startup report...', delay: 9800 }
    ];

    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setActiveRole(step.role);
        setLogs((prev) => [
          ...prev,
          {
            id: 'log-' + idx,
            agentRole: step.role,
            agentName: AGENT_ROSTER.find((a) => a.role === step.role)?.name || 'Agent',
            message: step.message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            type: step.role === 'ceo' ? 'task' : 'thought'
          }
        ]);

        const nextProgress = Math.min(95, Math.round(((idx + 1) / steps.length) * 100));
        setProgress(nextProgress);

        if (idx > 0 && steps[idx - 1].role !== step.role && !completedRoles.includes(steps[idx - 1].role)) {
          setCompletedRoles((prev) => [...prev, steps[idx - 1].role]);
        }
      }, step.delay);

      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [ideaName]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
          <BrainCircuit className="w-4 h-4 animate-spin text-indigo-500" />
          <span>Multi-Agent Swarm Orchestration Active</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          AI Executives Evaluating Your Startup
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          CEO Marcus Vance is coordinating 6 specialized AI agents in real-time...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-500" />
            Evaluation Progress
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Agent Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {AGENT_ROSTER.map((agent) => {
          const isActive = activeRole === agent.role;
          const isDone = completedRoles.includes(agent.role);

          return (
            <div
              key={agent.role}
              className={`p-3 rounded-xl border text-center transition-all relative ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow-md scale-105'
                  : isDone
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 opacity-60'
              }`}
            >
              <div className="text-2xl mb-1">{agent.avatar}</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {agent.name.split(' ')[0]}
              </div>
              <div className="text-[10px] text-slate-500 capitalize truncate mb-2">
                {agent.role}
              </div>

              {isActive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/80 px-2 py-0.5 rounded-full">
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  Evaluating
                </span>
              ) : isDone ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Ready
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">Waiting</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Terminal Agent Live Communication Feed */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl font-mono text-xs text-slate-300 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-200">Live Agent Communication Log</span>
          </div>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400">
            agent_bus://exec-channel
          </span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 animate-fadeIn">
              <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">[{log.timestamp}]</span>
              <span className="font-bold text-indigo-400 shrink-0">[{log.agentName}]:</span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-slate-500 italic py-4 text-center">
              Initializing agent bus connection...
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
