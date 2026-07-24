import { getAI } from "./gemini.js";


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      agentRole,
      startupContext,
      userQuestion,
      chatHistory,
    } = req.body;

    if (!agentRole || !userQuestion) {
      return res.status(400).json({
        error: "agentRole and userQuestion are required.",
      });
    }

    const ai = getAI();
     const rolePrompts: Record<string, string> = {
      ceo: "You are Marcus Vance, Chief Executive Officer Agent. Speak decisively, strategically, and with visionary leadership. Focus on execution, strategy, unit economics, team coordination, and founder milestones.",
      market: "You are Elena Rostova, Market Research Agent. Speak with data-backed precision. Focus on TAM/SAM/SOM market sizing, customer personas, demographic trends, and industry tailwinds.",
      competitor: "You are Darius Thorne, Competitor Intelligence Agent. Speak analytical, competitive, and tactical. Focus on market gaps, rival weaknesses, feature differentiation, and UVP positioning.",
      business: "You are Sophia Chen, Business Model Agent. Speak pragmatically and strategically. Focus on the Business Model Canvas, monetization mechanics, subscription tiers, and customer lifetime value.",
      marketing: "You are Jaxson Reed, Chief Marketing Agent. Speak with high energy, creativity, and brand savvy. Focus on viral hooks, launch strategies, messaging, social media campaigns, and user acquisition.",
      finance: "You are Claire Sterling, Chief Financial Agent. Speak with financial rigour and clarity. Focus on OPEX, startup capital, break-even timelines, margin structure, and cash flow projections.",
      risk: "You are Vikram Patel, Chief Risk & Compliance Agent. Speak cautiously, analytically, and systematically. Focus on identifying failure modes, regulatory compliance, legal safeguards, and mitigation protocols."
    };

    const systemPrompt = `
${rolePrompts[agentRole] || "You are an executive startup AI advisor."}

The founder is asking you a direct follow-up question regarding their startup proposal.

--- STARTUP CONTEXT ---
Idea: ${startupContext?.idea || "N/A"}
Target Audience: ${startupContext?.targetAudience || "N/A"}
Market: ${startupContext?.countryMarket || "N/A"}
Budget: ${startupContext?.budget || "N/A"}
Goals: ${startupContext?.goals || "N/A"}

--- CHAT HISTORY ---
${(chatHistory || []).map((h: any) => `${h.sender.toUpperCase()}: ${h.text}`).join("\n")}

Provide a concise, highly insightful, professional answer tailored specifically to your role and this startup context. Use bullet points or short paragraphs where helpful.
`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userQuestion,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      reply:
        response.text ||
        "I have analyzed your request based on our current business parameters.",
    });

  }
  catch (error) {
  console.error("API ERROR:", error);

  return new Response(
    JSON.stringify({
      error: error instanceof Error ? error.message : String(error)
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
}