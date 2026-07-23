import React, { useState } from 'react';
import { StartupReport } from '../types';
import { AGENT_ROSTER } from '../data/templates';
import { BusinessModelCanvas } from './BusinessModelCanvas';
import { FinancialCalculator } from './FinancialCalculator';
import { InteractiveAgentChat } from './InteractiveAgentChat';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Swords, 
  Layers, 
  Megaphone, 
  DollarSign, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Award,
  ArrowRight
} from 'lucide-react';

interface ReportViewProps {
  report: StartupReport;
  onSaveReport?: (report: StartupReport) => void;
  isSaved?: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onSaveReport, isSaved }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'market' | 'competitor' | 'business' | 'marketing' | 'finance' | 'risk' | 'chat'
  >('overview');

  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = `
# Executive Startup Report: ${report.input.idea}
Viability Score: ${report.plan.viabilityScore}/100

## CEO Executive Summary
${report.plan.ceoSummary}

## Market Sizing
- TAM: ${report.market.marketSizing.tam.value} (${report.market.marketSizing.tam.description})
- SAM: ${report.market.marketSizing.sam.value} (${report.market.marketSizing.sam.description})
- SOM: ${report.market.marketSizing.som.value} (${report.market.marketSizing.som.description})

## Unique Value Proposition
${report.competitor.uniqueValueProposition}

## Break-Even Analysis
Break-even targeted at Month ${report.finance.breakEven.breakEvenMonth}. ${report.finance.breakEven.summary}
    `;
    navigator.clipboard.writeText(md.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
const handleSummaryPrint = () => {
  const printWindow = window.open('', '', 'width=1000,height=800');

  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Executive Startup Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #111;
          }
          h1, h2, h3 {
            color: #1e293b;
          }
          .section {
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;
          }
        </style>
      </head>

      <body>
        <h1>Executive Startup Report</h1>

        <div class="section">
          <h2>${report.input.idea}</h2>
          <p><b>Viability Score:</b> ${report.plan.viabilityScore}/100</p>
          <p>
          ${
            report.plan.viabilityScore >= 80 
            ? "High Potential" 
            : report.plan.viabilityScore >= 60 
            ? "Moderate Viability" 
            : "High Risk"
          }
          </p>
        </div>

        <div class="section">
          <h3>CEO Executive Summary</h3>
          <p>${report.plan.ceoSummary}</p>
        </div>

        <div class="section">
          <h3>Market Analysis</h3>
          <p>${report.market.targetAudienceAnalysis.demographics}</p>
        </div>

        <div class="section">
          <h3>Unique Value Proposition</h3>
          <p>${report.competitor.uniqueValueProposition}</p>
        </div>

        <div class="section">
          <h3>Break Even</h3>
          <p>
          Month ${report.finance.breakEven.breakEvenMonth}
          </p>
        </div>

      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};
const handleFullReportPrint = () => {
  const printWindow = window.open("", "", "width=1000,height=900");

  if (!printWindow) return;

  printWindow.document.write(`
    <html>
    <head>
      <title>Full Startup Analysis Report</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          line-height: 1.6;
          color: #111;
        }

        h1 {
          font-size: 28px;
        }

        h2 {
          margin-top: 30px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 8px;
        }

        h3 {
          margin-top: 20px;
        }

        .section {
          page-break-inside: avoid;
          margin-bottom: 25px;
        }

        li {
          margin-bottom: 5px;
        }

      </style>

    </head>

    <body>

      <h1>${report.input.idea}</h1>

      <div class="section">
        <h2>Viability Score</h2>
        <p>${report.plan.viabilityScore}/100</p>
        <p>
        ${
          report.plan.viabilityScore >= 80
            ? "High Potential"
            : report.plan.viabilityScore >= 60
            ? "Moderate Viability"
            : "High Risk"
        }
        </p>
      </div>


      <div class="section">
        <h2>CEO Executive Summary</h2>
        <p>${report.plan.ceoSummary}</p>
      </div>


      <div class="section">
        <h2>Market Analysis</h2>

        <p>
        ${report.market.targetAudienceAnalysis.demographics}
        </p>

        <h3>TAM</h3>
        <p>${report.market.marketSizing.tam.value}</p>

        <h3>SAM</h3>
        <p>${report.market.marketSizing.sam.value}</p>

        <h3>SOM</h3>
        <p>${report.market.marketSizing.som.value}</p>

      </div>



      <div class="section">

        <h2>Competitor Analysis</h2>

        <p>
        ${report.competitor.uniqueValueProposition}
        </p>

      </div>




      <div class="section">

        <h2>Business Model</h2>


        <h3>Key Partnerships</h3>

        <ul>
        ${
          report.businessModel.canvas.keyPartnerships
            .map(item => `<li>${item}</li>`)
            .join("")
        }
        </ul>



        <h3>Revenue Streams</h3>

        <ul>
        ${
          report.businessModel.canvas.revenueStreams
            .map(item => `<li>${item}</li>`)
            .join("")
        }
        </ul>


      </div>




      <div class="section">

        <h2>Financial Analysis</h2>

        <p>
        Break Even Month:
        ${report.finance.breakEven.breakEvenMonth}
        </p>

      </div>





      <div class="section">

        <h2>Risk Analysis</h2>


        ${
          report.risk.risks
            .map(
              risk => `
              <div>

                <h3>${risk.category}</h3>

                <p>
                <b>Risk:</b>
                ${risk.riskDescription}
                </p>


                <p>
                <b>Severity:</b>
                ${risk.severity}
                </p>


                <p>
                <b>Mitigation:</b>
                ${risk.mitigationStrategy}
                </p>


                <hr/>

              </div>
              `
            )
            .join("")
        }


      </div>



    </body>
    </html>
  `);


  printWindow.document.close();
  printWindow.print();
};
  // TAM Chart Data
  const tamData = [
    { name: 'TAM (Global)', value: report.market.marketSizing.tam.numericValueMillions },
    { name: 'SAM (Regional)', value: report.market.marketSizing.sam.numericValueMillions },
    { name: 'SOM (Year 2)', value: report.market.marketSizing.som.numericValueMillions }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Top Banner & Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Multi-Agent Synthesis Complete
              </span>
              <span className="text-xs text-slate-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {report.input.idea}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Target Market: <strong className="text-slate-700 dark:text-slate-200">{report.input.countryMarket || 'Global'}</strong> | Budget: <strong className="text-slate-700 dark:text-slate-200">{report.input.budget || 'Bootstrap'}</strong>
            </p>
          </div>

          {/* Viability Gauge Score */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              {report.plan.viabilityScore}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Viability Score</div>
              <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                {report.plan.viabilityScore >= 80 ? 'High Potential' : report.plan.viabilityScore >= 60 ? 'Moderate Viability' : 'High Risk'}
              </div>
              <div className="text-[10px] text-slate-400">Out of 100 points</div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Report prepared by 7 Executive AI Agents</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
 onClick={handleSummaryPrint}
>
<Printer/>
<span>Summary PDF</span>
</button>


<button
 onClick={handleFullReportPrint}
>
<Download/>
<span>Full Report PDF</span>
</button>

            {onSaveReport && (
              <button
                onClick={() => onSaveReport(report)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved to Library' : 'Save Project'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'overview', label: '🤵 CEO Overview & Roadmap', icon: Building2 },
          { id: 'market', label: '📊 Market & TAM', icon: TrendingUp },
          { id: 'competitor', label: '🥊 Competitor Matrix', icon: Swords },
          { id: 'business', label: '💼 Business Model Canvas', icon: Layers },
          { id: 'marketing', label: '📣 Marketing & GTM', icon: Megaphone },
          { id: 'finance', label: '💰 Financial Model', icon: DollarSign },
          { id: 'risk', label: '⚠️ Risk Safeguards', icon: ShieldAlert },
          { id: 'chat', label: '💬 Talk to Agents', icon: MessageSquare },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                isSelected
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. CEO Executive Overview & Roadmap */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Executive Diagnosis */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              CEO Executive Diagnosis
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {report.plan.ceoSummary}
            </p>
          </div>

          {/* Strategic Hypotheses */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Core Strategic Hypotheses to Validate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {report.plan.keyHypotheses?.map((hypo, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Hypothesis {idx + 1}</span>
                  <p className="text-slate-700 dark:text-slate-300">{hypo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Phase Milestone Execution Roadmap */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              12-Month CEO Execution Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Milestone 1 */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Phase 1</span>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-bold">
                    {report.ceoRoadmap?.milestone1?.period || 'Months 1-3'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {report.ceoRoadmap?.milestone1?.title || 'Foundation & Launch'}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {report.ceoRoadmap?.milestone1?.objectives?.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestone 2 */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Phase 2</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-700 dark:text-blue-300 font-bold">
                    {report.ceoRoadmap?.milestone2?.period || 'Months 3-6'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {report.ceoRoadmap?.milestone2?.title || 'GTM & Revenue'}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {report.ceoRoadmap?.milestone2?.objectives?.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestone 3 */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Phase 3</span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded text-emerald-700 dark:text-emerald-300 font-bold">
                    {report.ceoRoadmap?.milestone3?.period || 'Months 6-12'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {report.ceoRoadmap?.milestone3?.title || 'Scale & Expansion'}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {report.ceoRoadmap?.milestone3?.objectives?.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* 2. Market Research */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          
          {/* Persona Card */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Users className="w-5 h-5" />
              <span>Target Customer Persona: {report.market.targetAudienceAnalysis.personaName}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-500 uppercase">Demographics & Profile</span>
                <p className="text-slate-800 dark:text-slate-200">{report.market.targetAudienceAnalysis.demographics}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold text-emerald-600 dark:text-emerald-400">
                  Willingness to Pay: {report.market.targetAudienceAnalysis.willingnessToPay}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-500 uppercase">Core Pain Points</span>
                <ul className="space-y-1 text-slate-800 dark:text-slate-200">
                  {report.market.targetAudienceAnalysis.painPoints?.map((pain, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-500">•</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Market Sizing TAM Chart */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Market Sizing Analysis (TAM / SAM / SOM in $ Millions)
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">TAM (Total Addressable)</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{report.market.marketSizing.tam.value}</div>
                <p className="text-xs text-slate-500">{report.market.marketSizing.tam.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">SAM (Serviceable)</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{report.market.marketSizing.sam.value}</div>
                <p className="text-xs text-slate-500">{report.market.marketSizing.sam.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">SOM (Obtainable)</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{report.market.marketSizing.som.value}</div>
                <p className="text-xs text-slate-500">{report.market.marketSizing.som.description}</p>
              </div>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tamData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(v) => `$${v}M`} />
                  <Tooltip formatter={(v: any) => [`$${v} Million`, 'Market Size']} />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Trends */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Macro Industry Tailwinds & Trends
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {report.market.industryTrends?.map((trend, i) => (
                <li key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">#</span>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* 3. Competitor Analysis */}
      {activeTab === 'competitor' && (
        <div className="space-y-6">
          
          {/* Unique Value Proposition */}
          <div className="p-6 bg-gradient-to-r from-red-900 via-slate-900 to-indigo-950 text-white rounded-2xl shadow-lg space-y-2">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Unique Value Proposition (UVP)
            </div>
            <p className="text-lg font-bold leading-relaxed">
              "{report.competitor.uniqueValueProposition}"
            </p>
          </div>

          {/* Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.competitor.competitors?.map((comp, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{comp.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${comp.type === 'Direct' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                    {comp.type} Competitor
                  </span>
                </div>
                <div className="text-xs text-slate-500">Pricing: {comp.pricingModel}</div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <span className="font-bold text-emerald-600">Strengths:</span>
                    {comp.strengths?.map((s, i) => <div key={i} className="text-slate-600 dark:text-slate-300">+ {s}</div>)}
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-red-600">Weaknesses:</span>
                    {comp.weaknesses?.map((w, i) => <div key={i} className="text-slate-600 dark:text-slate-300">- {w}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Comparison Matrix */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Feature Comparison Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Feature</th>
                    <th className="p-3 text-indigo-600 dark:text-indigo-400 font-extrabold">Our Startup</th>
                    <th className="p-3">Competitor A</th>
                    <th className="p-3">Competitor B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {report.competitor.featureComparisonMatrix?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{row.featureName}</td>
                      <td className="p-3 font-bold text-emerald-600">
                        {typeof row.ourStartup === 'boolean' ? (row.ourStartup ? '✓ Included' : '✗') : row.ourStartup}
                      </td>
                      <td className="p-3 text-slate-500">
                        {typeof row.competitorA === 'boolean' ? (row.competitorA ? '✓ Included' : '✗ No') : row.competitorA}
                      </td>
                      <td className="p-3 text-slate-500">
                        {typeof row.competitorB === 'boolean' ? (row.competitorB ? '✓ Included' : '✗ No') : row.competitorB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 4. Business Model Canvas */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <BusinessModelCanvas canvas={report.businessModel.canvas} />

          {/* Pricing Tiers */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recommended Pricing Tiers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.businessModel.pricingTiers?.map((tier, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tier.name}</h4>
                    <span className="text-xs text-slate-500">{tier.targetSegment}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {tier.price} <span className="text-xs font-normal text-slate-500">/{tier.billingCycle}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                    {tier.featuresIncluded?.map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Marketing & GTM */}
      {activeTab === 'marketing' && (
        <div className="space-y-6">
          
          {/* Brand Identity */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Brand Identity & Voice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-500 uppercase">Suggested Brand Names</span>
                <div className="flex flex-wrap gap-2">
                  {report.marketing.branding?.suggestedNames?.map((n, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-bold">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-500 uppercase">Catchy Taglines</span>
                <ul className="space-y-1 font-medium text-slate-800 dark:text-slate-200 italic">
                  {report.marketing.branding?.taglines?.map((t, i) => (
                    <li key={i}>"{t}"</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media Campaign Cards */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Viral Social Media Campaigns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.marketing.socialMediaCampaigns?.map((camp, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {camp.platform}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{camp.campaignTitle}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{camp.concept}</p>
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-indigo-600 dark:text-indigo-300">
                    "{camp.contentHook}"
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 6. Financial Model */}
      {activeTab === 'finance' && (
        <FinancialCalculator finance={report.finance} />
      )}

      {/* 7. Risk Safeguards */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                Risk Matrix & Mitigation Strategies
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${report.risk.overallRiskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                Overall Risk Level: {report.risk.overallRiskLevel}
              </span>
            </div>

            <div className="space-y-3">
              {report.risk.risks?.map((risk, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{risk.category}: {risk.riskDescription}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-[10px]">
                        Severity: {risk.severity}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <strong className="text-emerald-600 dark:text-emerald-400">Mitigation:</strong> {risk.mitigationStrategy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Interactive Agent Chat */}
      {activeTab === 'chat' && (
        <InteractiveAgentChat startupContext={report.input} />
      )}

    </div>
  );
};
