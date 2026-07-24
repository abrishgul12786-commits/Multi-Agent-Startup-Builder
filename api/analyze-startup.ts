import { getAI } from "./gemini";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      idea,
      targetAudience,
      countryMarket,
      budget,
      goals,
    } = req.body;

    if (!idea || typeof idea !== "string" || !idea.trim()) {
      return res.status(400).json({
        error: "Startup idea is required.",
      });
    }

    const ai = getAI();

        const prompt = `
You are the CEO and Master Multi-Agent Coordinator of an elite Startup Builder AI system.
You will evaluate the following startup proposal and coordinate 6 specialized executive agents to perform an in-depth analysis.

--- STARTUP INPUTS ---
- Startup Idea: "${idea}"
- Target Audience: "${targetAudience || "Not specified, analyze ideal audience"}"
- Target Country/Market: "${countryMarket || "Global / United States"}"
- Initial Budget: "${budget || "Bootstrap / Seed"}"
- Founder Goals: "${goals || "High growth SaaS business"}"

--- AGENTS TO COORDINATE ---
1. CEO Agent (Overall strategy, viability score 0-100, key hypotheses, milestones)
2. Market Research Agent (Target persona, TAM/SAM/SOM market sizing with realistic numbers in millions USD, key industry trends)
3. Competitor Agent (Direct & indirect competitors, strengths, weaknesses, feature comparison matrix, market gaps, UVP)
4. Business Model Agent (9-box Business Model Canvas, tiered pricing structure, revenue streams)
5. Marketing Agent (Branding/taglines, voice, 3-phase GTM strategy, 3 creative social media campaigns)
6. Finance Agent (Startup setup capital expenses, monthly OPEX breakdown, Year 1 quarterly cash flow, break-even month & required revenue)
7. Risk Agent (Risk matrix across Tech, Market, Financial, Legal categories with severity, likelihood, and mitigations)

Produce a thorough, realistic, highly structured JSON report following this exact JSON structure:

{
  "plan": {
    "ceoSummary": "High-level strategic diagnosis of the startup idea...",
    "viabilityScore": 85,
    "keyHypotheses": ["Hypothesis 1...", "Hypothesis 2...", "Hypothesis 3..."],
    "tasks": [
      { "agentRole": "market", "taskTitle": "Market Sizing & Persona Mapping", "description": "...", "status": "completed" },
      { "agentRole": "competitor", "taskTitle": "Competitor Landscape & Gap Analysis", "description": "...", "status": "completed" },
      { "agentRole": "business", "taskTitle": "Business Model Canvas & Pricing Tiers", "description": "...", "status": "completed" },
      { "agentRole": "marketing", "taskTitle": "Brand Identity & GTM Campaign", "description": "...", "status": "completed" },
      { "agentRole": "finance", "taskTitle": "Financial Modeling & Break-Even Analysis", "description": "...", "status": "completed" },
      { "agentRole": "risk", "taskTitle": "Risk Matrix & Mitigation Protocol", "description": "...", "status": "completed" }
    ]
  },
  "market": {
    "targetAudienceAnalysis": {
      "personaName": "E.g., Tech-savvy SMB Owner Sam",
      "demographics": "Age 28-45, small business founder or team lead...",
      "painPoints": ["High lawyer hourly fees ($350+/hr)", "Slow turnaround for simple contracts", "Fear of legal compliance pitfalls"],
      "willingnessToPay": "High for automated, sub-$100/mo legal protection"
    },
    "marketSizing": {
      "tam": { "value": "$12.5 Billion", "description": "Global SMB legal tech software market", "numericValueMillions": 12500 },
      "sam": { "value": "$2.8 Billion", "description": "US & Canada SMB contract management software", "numericValueMillions": 2800 },
      "som": { "value": "$45 Million", "description": "Target capture in initial 2 years", "numericValueMillions": 45 }
    },
    "industryTrends": [
      "AI document processing adoption in professional services growing at 34% CAGR",
      "Shift towards subscription self-serve legal tools over expensive law firm retainers",
      "Increasing demand for real-time compliance automation"
    ]
  },
  "competitor": {
    "competitors": [
      {
        "name": "Competitor Alpha",
        "type": "Direct",
        "strengths": ["Strong brand recognition", "Large library of templates"],
        "weaknesses": ["Expensive legacy pricing", "No real-time AI risk flagging"],
        "pricingModel": "$200/month flat rate"
      },
      {
        "name": "Competitor Beta",
        "type": "Indirect",
        "strengths": ["Basic automated forms"],
        "weaknesses": ["Generic non-personalized output", "Poor UI/UX"],
        "pricingModel": "Pay per document ($49/doc)"
      }
    ],
    "featureComparisonMatrix": [
      { "featureName": "AI Instant Risk Analysis", "ourStartup": true, "competitorA": false, "competitorB": false },
      { "featureName": "Automated Document Drafting", "ourStartup": true, "competitorA": true, "competitorB": true },
      { "featureName": "Live Lawyer On-Demand Review", "ourStartup": "Optional Add-on", "competitorA": true, "competitorB": false },
      { "featureName": "Custom Brand Workflow Integration", "ourStartup": true, "competitorA": false, "competitorB": false }
    ],
    "marketGaps": [
      "Lack of affordable real-time risk assessment for non-legal professionals",
      "Clunky UI in traditional legacy legal software",
      "Inflexible per-document pricing instead of modern SaaS subscriptions"
    ],
    "uniqueValueProposition": "Instant, AI-driven legal contract auditing and drafting that gives SMBs enterprise-grade legal safety at 1/10th the cost."
  },
  "businessModel": {
    "canvas": {
      "keyPartnerships": ["Freelance lawyer networks", "B2B SaaS incubators", "Small business accounting platforms"],
      "keyActivities": ["AI model fine-tuning", "Document parser maintenance", "Customer success & legal compliance updates"],
      "keyResources": ["Proprietary prompt pipeline & fine-tuned LLM", "Legal domain dataset", "Engineering team"],
      "valuePropositions": ["Save 80% on legal expenses", "Review contracts in 30 seconds", "Avoid costly legal liability traps"],
      "customerRelationships": ["Self-serve onboarding", "In-app live chat support", "Automated compliance alerts"],
      "channels": ["Inbound SEO & content marketing", "LinkedIn targeted B2B ads", "Integrations with Zapier & Slack"],
      "customerSegments": ["Solo founders & startups", "SMB agency owners", "Freelancers & consultants"],
      "costStructure": ["AI API & Cloud Hosting", "Customer acquisition & ads", "Legal advisor retainer"],
      "revenueStreams": ["Tiered monthly SaaS subscriptions", "Add-on custom template credits", "Enterprise team seats"]
    },
    "pricingTiers": [
      {
        "name": "Starter",
        "price": "$49",
        "billingCycle": "per month",
        "targetSegment": "Solo founders & freelancers",
        "featuresIncluded": ["Up to 15 document reviews/mo", "Standard contract generator", "Email support"]
      },
      {
        "name": "Pro Growth",
        "price": "$129",
        "billingCycle": "per month",
        "targetSegment": "Scaling SMBs (5-20 team members)",
        "featuresIncluded": ["Unlimited document reviews", "Custom AI clause editor", "Team workspace (5 seats)", "Priority support"]
      },
      {
        "name": "Enterprise",
        "price": "$399",
        "billingCycle": "per month",
        "targetSegment": "Mid-market & Agencies",
        "featuresIncluded": ["Dedicated legal advisor call (1hr/mo)", "Custom API access", "Unlimited seats & SSO", "Custom SLA"]
      }
    ]
  },
  "marketing": {
    "branding": {
      "suggestedNames": ["LegalPulse AI", "ClarifyLegal", "JurisDoc"],
      "taglines": ["Enterprise legal protection, simplified for your small business.", "Draft fast. Sign with confidence."],
      "brandVoice": "Authoritative, approachable, modern, and reassuring.",
      "primaryColors": ["#0f172a", "#2563eb", "#10b981"]
    },
    "gtmStrategy": {
      "phase1PreLaunch": [
        "Launch interactive 'Free NDA Risk Scanner' lead magnet tool to capture 1,000 email signups",
        "Build thought leadership content on LinkedIn highlighting expensive SMB legal horror stories"
      ],
      "phase2Launch": [
        "Product Hunt & Hacker News launch with lifetime founder discount",
        "Partner with startup accelerators & coworking spaces to offer 3 months free to members"
      ],
      "phase3Growth": [
        "SEO content strategy targeting high-intent keywords like 'how to review vendor contract without lawyer'",
        "Launch affiliate referral program giving 20% recurring commission to startup accountants & advisors"
      ]
    },
    "socialMediaCampaigns": [
      {
        "platform": "LinkedIn",
        "campaignTitle": "#LawyerVsAI Challenge",
        "concept": "Compare time and cost taken by a human lawyer ($500, 3 days) vs Legal AI ($0, 30 seconds) on the same vendor contract.",
        "contentHook": "We sent the exact same 20-page contract to a $400/hr lawyer and our AI. Here's what happened..."
      },
      {
        "platform": "X / Twitter",
        "campaignTitle": "Clause of the Day",
        "concept": "Daily breakdowns of predatory clauses sneaky vendors hide in standard contracts.",
        "contentHook": "90% of business owners sign this clause without realizing it could cost them $50,000..."
      },
      {
        "platform": "YouTube / TikTok",
        "campaignTitle": "3-Minute Contract Audits",
        "concept": "Short video audits of famous public contracts (e.g., Spotify creator agreements) highlighting tricky terms.",
        "contentHook": "Is Spotify secretly taking your publishing rights? Let's scan their creator agreement in 10 seconds."
      }
    ]
  },
  "finance": {
    "startupCosts": [
      { "category": "Legal Incorporation & Trademarks", "estimatedCostUSD": 2500, "notes": "Delaware C-Corp setup & initial trademark filing" },
      { "category": "Tech Infrastructure & AI API Setup", "estimatedCostUSD": 3000, "notes": "Cloud hosting, domain, API credits buffer" },
      { "category": "Brand & Product Design", "estimatedCostUSD": 4000, "notes": "UI/UX design system & web build" },
      { "category": "Initial GTM Marketing & Ad Spend", "estimatedCostUSD": 5500, "notes": "Targeted ad tests & content production" }
    ],
    "monthlyExpenses": [
      { "category": "AI Infrastructure & API Usage", "costUSD": 1200 },
      { "category": "Hosting, DB & Security Monitoring", "costUSD": 600 },
      { "category": "Marketing & Customer Acquisition", "costUSD": 2500 },
      { "category": "Legal Advisor Retainer & Compliance", "costUSD": 1500 },
      { "category": "Customer Support & Misc Tools", "costUSD": 800 }
    ],
    "year1Projections": [
      { "quarter": "Q1", "revenueUSD": 9000, "expensesUSD": 19800, "profitUSD": -10800 },
      { "quarter": "Q2", "revenueUSD": 28000, "expensesUSD": 21000, "profitUSD": 7000 },
      { "quarter": "Q3", "revenueUSD": 62000, "expensesUSD": 24000, "profitUSD": 38000 },
      { "quarter": "Q4", "revenueUSD": 115000, "expensesUSD": 28000, "profitUSD": 87000 }
    ],
    "breakEven": {
      "breakEvenMonth": 5,
      "requiredMonthlyRevenueUSD": 6600,
      "requiredUnitsOrSubscribers": "52 Pro subscribers @ $129/mo",
      "summary": "At an average MRR of $129/user, the company reaches operational cash flow break-even by Month 5."
    }
  },
  "risk": {
    "overallRiskLevel": "Moderate",
    "risks": [
      {
        "category": "Regulatory & Legal",
        "riskDescription": "Unauthorized practice of law (UPL) claims from regulatory state bars",
        "severity": "High",
        "likelihood": "Medium",
        "mitigationStrategy": "Include explicit disclaimers that the software provides automated information analysis, not licensed legal advice, and provide optional human attorney review integrations."
      },
      {
        "category": "Product & Tech",
        "riskDescription": "AI hallucination or missing a critical risk clause in a high-stakes contract",
        "severity": "High",
        "likelihood": "Low",
        "mitigationStrategy": "Fine-tune models on verified legal datasets and implement confidence scoring with human-in-the-loop warnings for ambiguous clauses."
      },
      {
        "category": "Market & Demand",
        "riskDescription": "Customer skepticism toward AI handling sensitive legal documents",
        "severity": "Medium",
        "likelihood": "Medium",
        "mitigationStrategy": "SOC-2 Type II compliance, zero data retention policy for model training, and transparent privacy guarantees."
      },
      {
        "category": "Financial & Operational",
        "riskDescription": "High API compute costs cutting into gross margins if users upload massive documents",
        "severity": "Medium",
        "likelihood": "Low",
        "mitigationStrategy": "Implement document page limits per tier and optimize prompt token usage."
      }
    ],
    "contingencyPlan": "If regulatory hurdles slow direct legal sales, pivot product positioning toward internal contract organization and vendor procurement management for corporate teams."
  },
  "ceoRoadmap": {
    "milestone1": {
      "title": "Foundation & MVP Launch",
      "period": "Months 1 - 3",
      "objectives": [
        "Finalize Delaware C-Corp & regulatory disclaimer frameworks",
        "Build & launch core contract analysis MVP with top 5 document templates",
        "Onboard 50 beta SMB users and achieve 80%+ positive satisfaction rate"
      ]
    },
    "milestone2": {
      "title": "Go-To-Market & Revenue Traction",
      "period": "Months 3 - 6",
      "objectives": [
        "Launch Paid Growth ($129/mo) plan and reach $10k MRR",
        "Establish referral partnerships with 5 startup incubators and accounting networks",
        "Achieve break-even cash flow by Month 5"
      ]
    },
    "milestone3": {
      "title": "Scale & Enterprise Expansion",
      "period": "Months 6 - 12",
      "objectives": [
        "Release custom API integrations for Zapier, Slack, and Google Drive",
        "Scale MRR to $40,000+ with 300+ paying business customers",
        "Raise $1.5M Seed round for international market expansion"
      ]
    }
  },
  "finalSummary": "In summary, this startup proposal addresses a massive, high-friction pain point in the SMB ecosystem with an attractive subscription business model, strong unit economics, and a clear path to profitability by Month 5."
}
`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const responseText = response.text || "";
    const parsedData = JSON.parse(responseText);

    const report = {
      id: "report-" + Date.now(),
      createdAt: new Date().toISOString(),
      input: {
        idea,
        targetAudience,
        countryMarket,
        budget,
        goals,
      },
      ...parsedData,
    };

  
   return res.status(200).json(report);

} catch (error: any) {
  console.error("API ERROR:", error);

  return res.status(500).json({
    error: error?.message || String(error),
  });
}
}