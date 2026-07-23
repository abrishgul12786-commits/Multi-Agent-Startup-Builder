import React, { useState } from 'react';
import { FinanceOutput } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Sliders, 
  ShieldAlert 
} from 'lucide-react';

interface FinancialCalculatorProps {
  finance: FinanceOutput;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ finance }) => {
  // Interactive Sliders for Sensitivity Analysis
  const defaultBasePrice = 99;
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(defaultBasePrice);
  
  const totalMonthlyOpex = finance.monthlyExpenses?.reduce((acc, curr) => acc + curr.costUSD, 0) || 5000;
  const [monthlyOpex, setMonthlyOpex] = useState<number>(totalMonthlyOpex);

  // Dynamic calculated break-even subscribers
  const requiredSubscribers = Math.ceil(monthlyOpex / Math.max(1, subscriptionPrice));
  const breakEvenMRR = requiredSubscribers * subscriptionPrice;

  // Custom Chart Data for Quarterly Cashflow
  const chartData = finance.year1Projections?.map((item) => ({
    quarter: item.quarter,
    Revenue: item.revenueUSD,
    Expenses: item.expensesUSD,
    Profit: item.profitUSD
  })) || [];

  return (
    <div className="space-y-6">
      
      {/* Header & Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Setup Capital */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Startup Setup Capital</span>
            <DollarSign className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ${finance.startupCosts?.reduce((a, b) => a + b.estimatedCostUSD, 0).toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Initial legal, tech infrastructure, design & GTM launch capital
          </p>
        </div>

        {/* Card 2: Projected Monthly OPEX */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Monthly Operating Expenses</span>
            <Sliders className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            ${monthlyOpex.toLocaleString()} / mo
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            API compute, hosting, marketing spend & retainers
          </p>
        </div>

        {/* Card 3: Break-Even Timeline */}
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-2">
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
            <span>Target Break-Even</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
            Month {finance.breakEven?.breakEvenMonth || 5}
          </div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300">
            {finance.breakEven?.summary || 'Reaches positive operational cash flow'}
          </p>
        </div>

      </div>

      {/* Interactive Sensitivity Simulator Box */}
      <div className="p-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold">Live Break-Even Sensitivity Calculator</h3>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-medium">
            Interactive Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            {/* Slider 1: Average Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-indigo-200">Average Subscription Price / Customer:</span>
                <span className="text-indigo-400 text-sm font-bold">${subscriptionPrice} / mo</span>
              </div>
              <input
                type="range"
                min="19"
                max="499"
                step="5"
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Monthly OPEX */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-indigo-200">Monthly Operating Expenses (OPEX):</span>
                <span className="text-indigo-400 text-sm font-bold">${monthlyOpex.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={monthlyOpex}
                onChange={(e) => setMonthlyOpex(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex flex-col justify-center space-y-3">
            <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
              Calculated Break-Even Requirement
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400">{requiredSubscribers}</span>
              <span className="text-sm text-indigo-200">Active Subscribers Needed</span>
            </div>
            <div className="text-xs text-indigo-300 pt-2 border-t border-indigo-800/80 flex items-center justify-between">
              <span>Required Monthly Revenue (MRR):</span>
              <span className="font-bold text-white">${breakEvenMRR.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Year 1 Projections Chart */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Year 1 Quarterly Financial Performance ($ USD)
            </h3>
            <p className="text-xs text-slate-500">
              Projected quarterly revenue growth vs operating expense curve
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="quarter" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(val) => `$${val / 1000}k`} />
              <Tooltip 
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Area type="monotone" dataKey="Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              <Area type="monotone" dataKey="Expenses" stroke="#6366f1" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Setup Costs Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Startup Capital Allocation Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Estimated Cost ($)</th>
                <th className="p-3">Notes & Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {finance.startupCosts?.map((cost, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{cost.category}</td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">${cost.estimatedCostUSD.toLocaleString()}</td>
                  <td className="p-3 text-slate-500">{cost.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
