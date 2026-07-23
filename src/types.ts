export type AgentRole = 
  | 'ceo' 
  | 'market' 
  | 'competitor' 
  | 'business' 
  | 'marketing' 
  | 'finance' 
  | 'risk';

export interface StartupInput {
  idea: string;
  targetAudience: string;
  countryMarket: string;
  budget: string;
  goals: string;
}

export interface AgentInfo {
  role: AgentRole;
  name: string;
  title: string;
  avatar: string;
  color: string;
  description: string;
}

export interface AgentLog {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  message: string;
  timestamp: string;
  type: 'info' | 'task' | 'thought' | 'complete' | 'error';
}

export interface ExecutionTask {
  agentRole: AgentRole;
  taskTitle: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface ExecutionPlan {
  ceoSummary: string;
  viabilityScore: number; // 0-100
  keyHypotheses: string[];
  tasks: ExecutionTask[];
}

export interface MarketResearchOutput {
  targetAudienceAnalysis: {
    personaName: string;
    demographics: string;
    painPoints: string[];
    willingnessToPay: string;
  };
  marketSizing: {
    tam: { value: string; description: string; numericValueMillions: number };
    sam: { value: string; description: string; numericValueMillions: number };
    som: { value: string; description: string; numericValueMillions: number };
  };
  industryTrends: string[];
}

export interface CompetitorItem {
  name: string;
  type: 'Direct' | 'Indirect';
  strengths: string[];
  weaknesses: string[];
  pricingModel: string;
}

export interface CompetitorOutput {
  competitors: CompetitorItem[];
  featureComparisonMatrix: {
    featureName: string;
    ourStartup: boolean | string;
    competitorA: boolean | string;
    competitorB: boolean | string;
  }[];
  marketGaps: string[];
  uniqueValueProposition: string;
}

export interface BusinessModelOutput {
  canvas: {
    keyPartnerships: string[];
    keyActivities: string[];
    keyResources: string[];
    valuePropositions: string[];
    customerRelationships: string[];
    channels: string[];
    customerSegments: string[];
    costStructure: string[];
    revenueStreams: string[];
  };
  pricingTiers: {
    name: string;
    price: string;
    billingCycle: string;
    targetSegment: string;
    featuresIncluded: string[];
  }[];
}

export interface MarketingOutput {
  branding: {
    suggestedNames: string[];
    taglines: string[];
    brandVoice: string;
    primaryColors: string[];
  };
  gtmStrategy: {
    phase1PreLaunch: string[];
    phase2Launch: string[];
    phase3Growth: string[];
  };
  socialMediaCampaigns: {
    platform: string;
    campaignTitle: string;
    concept: string;
    contentHook: string;
  }[];
}

export interface FinanceOutput {
  startupCosts: {
    category: string;
    estimatedCostUSD: number;
    notes: string;
  }[];
  monthlyExpenses: {
    category: string;
    costUSD: number;
  }[];
  year1Projections: {
    quarter: string;
    revenueUSD: number;
    expensesUSD: number;
    profitUSD: number;
  }[];
  breakEven: {
    breakEvenMonth: number;
    requiredMonthlyRevenueUSD: number;
    requiredUnitsOrSubscribers: string;
    summary: string;
  };
}

export interface RiskItem {
  category: 'Product & Tech' | 'Market & Demand' | 'Financial & Operational' | 'Regulatory & Legal';
  riskDescription: string;
  severity: 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  mitigationStrategy: string;
}

export interface RiskOutput {
  risks: RiskItem[];
  overallRiskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  contingencyPlan: string;
}

export interface StartupReport {
  id: string;
  createdAt: string;
  input: StartupInput;
  plan: ExecutionPlan;
  market: MarketResearchOutput;
  competitor: CompetitorOutput;
  businessModel: BusinessModelOutput;
  marketing: MarketingOutput;
  finance: FinanceOutput;
  risk: RiskOutput;
  ceoRoadmap: {
    milestone1: { title: string; period: string; objectives: string[] };
    milestone2: { title: string; period: string; objectives: string[] };
    milestone3: { title: string; period: string; objectives: string[] };
  };
  finalSummary: string;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentRole: AgentRole;
  text: string;
  timestamp: string;
}
