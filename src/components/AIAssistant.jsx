import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIAssistant({ context, onClose }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "👋 Hi! I'm your PS99 Hub assistant. Ask me anything about scripts, setup, or how to use features!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a helpful PS99 Hub assistant. Context: ${context || 'General help'}\n\nUser: ${userMessage}`,
      });
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-slate-900/95 border-purple-500/30 shadow-2xl z-50">
      <CardHeader className="flex flex-row items-center justify-between border-b border-purple-500/20 pb-3">
        <CardTitle className="text-white flex items-center gap-2"><Bot className="w-5 h-5 text-purple-400" />AI Assistant<Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" /></CardTitle>
        <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-white"><X className="w-4 h-4" /></Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="h-[400px] overflow-y-auto space-y-3 pr-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-lg p-3 ${msg.role === "user" ? "bg-purple-500 text-white" : "bg-slate-800/50 text-gray-200 border border-purple-500/20"}`}>
                {msg.role === "assistant" ? <ReactMarkdown className="text-sm prose prose-invert prose-sm max-w-none">{msg.content}</ReactMarkdown> : <p className="text-sm">{msg.content}</p>}
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-3 flex items-center gap-2"><Loader2 className="w-4 h-4 text-purple-400 animate-spin" /><span className="text-sm text-gray-400">Thinking...</span></div></div>}
        </div>
        <div className="flex gap-2">
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Ask me anything..." className="min-h-[60px] bg-slate-800/50 border-purple-500/30 text-white resize-none" />
          <Button onClick={sendMessage} disabled={!input.trim() || loading} className="bg-purple-500 hover:bg-purple-600 h-[60px]"><Send className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}