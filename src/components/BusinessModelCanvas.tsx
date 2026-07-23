import React from 'react';
import { BusinessModelOutput } from '../types';
import { 
  Users, 
  Settings, 
  Key, 
  HeartHandshake, 
  Send, 
  UserCheck, 
  Layers, 
  DollarSign, 
  CreditCard 
} from 'lucide-react';

interface BusinessModelCanvasProps {
  canvas: BusinessModelOutput['canvas'];
}

export const BusinessModelCanvas: React.FC<BusinessModelCanvasProps> = ({ canvas }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Strategic Business Model Canvas
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Standard 9-box framework detailing core partnerships, value props, and unit mechanics
          </p>
        </div>
      </div>

      {/* 9-Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        
        {/* 1. Key Partnerships */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Users className="w-4 h-4" />
            <span>Key Partnerships</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {canvas.keyPartnerships?.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2 & 3. Key Activities & Key Resources */}
        <div className="space-y-3">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Settings className="w-4 h-4" />
              <span>Key Activities</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {canvas.keyActivities?.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400">
              <Key className="w-4 h-4" />
              <span>Key Resources</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {canvas.keyResources?.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-teal-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Value Propositions (Centerpiece) */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border-2 border-purple-200 dark:border-purple-800/80 space-y-2 md:col-span-1">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300">
            <HeartHandshake className="w-4 h-4" />
            <span>Value Propositions</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
            {canvas.valuePropositions?.map((item, i) => (
              <li key={i} className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-xs flex items-start gap-1.5">
                <span className="text-purple-600">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5 & 6. Customer Relationships & Channels */}
        <div className="space-y-3">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
              <span>Customer Relationships</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {canvas.customerRelationships?.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
              <Send className="w-4 h-4" />
              <span>Channels</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {canvas.channels?.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-orange-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 7. Customer Segments */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
            <Users className="w-4 h-4" />
            <span>Customer Segments</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {canvas.customerSegments?.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Row: Cost Structure & Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
            <DollarSign className="w-4 h-4" />
            <span>Cost Structure</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {canvas.costStructure?.map((item, i) => (
              <li key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CreditCard className="w-4 h-4" />
            <span>Revenue Streams</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {canvas.revenueStreams?.map((item, i) => (
              <li key={i} className="p-2 rounded bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-medium">
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
