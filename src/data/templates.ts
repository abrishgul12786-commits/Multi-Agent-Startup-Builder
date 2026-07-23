import { StartupInput } from '../types';

export interface PresetTemplate {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  data: StartupInput;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'legal-ai',
    title: 'LegalDraft AI for SMBs',
    category: 'SaaS / B2B AI',
    icon: 'Scale',
    description: 'Automated contract review and compliance assistant tailored for small business owners without in-house legal counsel.',
    data: {
      idea: 'AI-powered legal document generator and instant contract review assistant for small and medium businesses. Analyzes NDAs, vendor contracts, and employment agreements for hidden risks in seconds.',
      targetAudience: 'Small business owners, solo founders, freelancers, and procurement managers in companies with 5-50 employees.',
      countryMarket: 'United States & Canada',
      budget: '$25,000 initial capital',
      goals: 'Reach 200 paying SMB subscribers ($99/mo) within 6 months and secure seed funding.'
    }
  },
  {
    id: 'vertical-farm',
    title: 'FarmPulse Urban Micro-Farms',
    category: 'AgTech / Climate',
    icon: 'Sprout',
    description: 'Modular, IoT-connected automated indoor hydroponic farming units for restaurant kitchens and organic grocers.',
    data: {
      idea: 'Subscription-based automated vertical hydroponic farm containers for high-end restaurants and specialty grocery stores to grow fresh herbs, microgreens, and rare produce on-site year-round.',
      targetAudience: 'Executive chefs, farm-to-table restaurant owners, boutique organic grocers, and eco-luxury hotels.',
      countryMarket: 'Germany & Northern Europe',
      budget: '$75,000 seed budget',
      goals: 'Deploy 15 micro-farm units in Berlin & Munich, achieving €15,000 MRR by month 9.'
    }
  },
  {
    id: 'eco-packaging',
    title: 'MushroomPack Eco-Boxes',
    category: 'E-commerce / CleanTech',
    icon: 'Package',
    description: 'Biodegradable, custom-molded packaging materials derived from agricultural waste and mycelium.',
    data: {
      idea: 'Custom compostable packaging made from mycelium mushroom roots and agricultural crop leftovers to replace styrofoam and bubble wrap for eco-conscious direct-to-consumer cosmetics and electronics brands.',
      targetAudience: 'DTC e-commerce brands in skincare, electronics, and specialty foods prioritizing zero-waste packaging.',
      countryMarket: 'United Kingdom & European Union',
      budget: '$50,000 startup capital',
      goals: 'Partner with 10 DTC brands for initial pilot runs and lower unit production costs below conventional recycled cardboard.'
    }
  },
  {
    id: 'fitness-social',
    title: 'PulseSquad Social Fitness',
    category: 'Consumer App / Mobile',
    icon: 'Activity',
    description: 'Gamified workout squads and micro-betting accountability platform for friend groups.',
    data: {
      idea: 'A mobile fitness app where friend groups form "Squads", set weekly workout goals, lock in small wager stakes ($5-$20), and track progress via wearable integrations. Winners split the pot or donate to charity.',
      targetAudience: 'Gen Z and Millennial fitness enthusiasts (ages 18-34) who struggle with workout consistency and enjoy social competition.',
      countryMarket: 'United States & Australia',
      budget: '$15,000 initial bootstrap budget',
      goals: 'Achieve 25,000 monthly active users and 40% 30-day retention rate within 5 months of App Store launch.'
    }
  }
];

export const AGENT_ROSTER = [
  {
    role: 'ceo' as const,
    name: 'Marcus Vance',
    title: 'Chief Executive Officer Agent',
    avatar: '🤵',
    color: 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    description: 'Coordinates all agents, formulates overall strategy, evaluates viability, and synthesizes executive roadmap.'
  },
  {
    role: 'market' as const,
    name: 'Elena Rostova',
    title: 'Market Research Agent',
    avatar: '📊',
    color: 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400',
    description: 'Analyzes target audience personas, calculates TAM/SAM/SOM market sizing, and identifies industry tailwinds.'
  },
  {
    role: 'competitor' as const,
    name: 'Darius Thorne',
    title: 'Competitor Intelligence Agent',
    avatar: '🥊',
    color: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400',
    description: 'Scouts key competitors, constructs feature comparison matrices, and highlights unserved market gaps.'
  },
  {
    role: 'business' as const,
    name: 'Sophia Chen',
    title: 'Business Model Agent',
    avatar: '💼',
    color: 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400',
    description: 'Drafts the 9-block Business Model Canvas, devises revenue streams, and designs tier-based pricing models.'
  },
  {
    role: 'marketing' as const,
    name: 'Jaxson Reed',
    title: 'Chief Marketing Agent',
    avatar: '📣',
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    description: 'Crafts brand identity, designs multi-phase GTM launch plans, and generates viral social media campaigns.'
  },
  {
    role: 'finance' as const,
    name: 'Claire Sterling',
    title: 'Chief Financial Agent',
    avatar: '💰',
    color: 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400',
    description: 'Models initial startup capital needs, projects monthly OPEX, quarterly cash flow, and calculates break-even timeline.'
  },
  {
    role: 'risk' as const,
    name: 'Vikram Patel',
    title: 'Chief Risk & Compliance Agent',
    avatar: '⚠️',
    color: 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400',
    description: 'Identifies product, market, financial, and legal vulnerabilities and details actionable mitigation protocols.'
  }
];
