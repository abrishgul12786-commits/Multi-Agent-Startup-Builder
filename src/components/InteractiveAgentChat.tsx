import React, { useState, useRef, useEffect } from 'react';
import { AgentChatMessage, AgentRole, StartupInput } from '../types';
import { AGENT_ROSTER } from '../data/templates';
import { Bot, Send, User, Sparkles, MessageSquare, Loader2 } from 'lucide-react';

interface InteractiveAgentChatProps {
  startupContext: StartupInput;
}

export const InteractiveAgentChat: React.FC<InteractiveAgentChatProps> = ({ startupContext }) => {
  const [selectedAgentRole, setSelectedAgentRole] = useState<AgentRole>('ceo');
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      agentRole: 'ceo',
      text: `Hello Founder! I'm Marcus Vance, your CEO Agent. My team and I completed the startup evaluation for "${startupContext.idea.slice(0, 45)}...". Feel free to select any agent from the roster above to ask targeted questions about our strategy, finances, marketing, or risks!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentAgent = AGENT_ROSTER.find((a) => a.role === selectedAgentRole) || AGENT_ROSTER[0];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: AgentChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      agentRole: selectedAgentRole,
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentRole: selectedAgentRole,
          startupContext,
          userQuestion: userText,
          chatHistory: messages.slice(-6)
        })
      });

      if (!res.ok) throw new Error('Agent failed to respond.');

      const data = await res.json();

      const agentMsg: AgentChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'agent',
        agentRole: selectedAgentRole,
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: AgentChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'agent',
        agentRole: selectedAgentRole,
        text: 'Apologies, I encountered a brief technical issue. Please rephrase your question or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[600px]">
      
      {/* Header & Agent Selector Tabs */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Executive AI Advisory Hotline
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Select an executive agent to consult
          </span>
        </div>

        {/* Agent Roster Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {AGENT_ROSTER.map((agent) => {
            const isSelected = selectedAgentRole === agent.role;
            return (
              <button
                key={agent.role}
                type="button"
                onClick={() => setSelectedAgentRole(agent.role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                <span>{agent.avatar}</span>
                <span>{agent.name.split(' ')[0]}</span>
                <span className="text-[9px] opacity-80 uppercase">({agent.role})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Active Agent Banner */}
      <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3">
        <div className="text-2xl">{currentAgent.avatar}</div>
        <div>
          <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
            Consulting {currentAgent.name} ({currentAgent.title})
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
            {currentAgent.description}
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-950/30">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const msgAgent = AGENT_ROSTER.find((a) => a.role === msg.agentRole) || currentAgent;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : msgAgent.avatar}
              </div>

              {/* Message Content */}
              <div className="space-y-1">
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
                  <span>{isUser ? 'You' : msgAgent.name}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-indigo-500 font-medium p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{currentAgent.name} is preparing a detailed response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask ${currentAgent.name} a question (e.g. "How can we cut initial marketing costs?")...`}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>

    </div>
  );
};
