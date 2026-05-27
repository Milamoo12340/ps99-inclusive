import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { Plus, Save, Loader2 } from "lucide-react";

export default function PerformanceLogger({ configs, onLogAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ config_name: "", fps: "", ping: "", memory_usage: "", notes: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.config_name || !formData.fps) return;
    setSaving(true);
    await base44.entities.PerformanceLog.create({ config_name: formData.config_name, fps: parseInt(formData.fps), ping: formData.ping ? parseInt(formData.ping) : null, memory_usage: formData.memory_usage ? parseInt(formData.memory_usage) : null, notes: formData.notes || null });
    setFormData({ config_name: "", fps: "", ping: "", memory_usage: "", notes: "" });
    setShowForm(false);
    setSaving(false);
    onLogAdded?.();
  };

  return (
    <Card className="bg-slate-900/50 border-purple-500/20">
      <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-white text-lg">Log Performance</CardTitle><Button onClick={() => setShowForm(!showForm)} size="sm" variant={showForm ? "outline" : "default"} className={showForm ? "" : "bg-gradient-to-r from-green-500 to-emerald-500"}><Plus className="w-4 h-4 mr-1" />{showForm ? "Cancel" : "Add Log"}</Button></div></CardHeader>
      {showForm && <CardContent><form onSubmit={handleSubmit} className="space-y-4"><select value={formData.config_name} onChange={(e) => setFormData({...formData, config_name: e.target.value})} className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-md text-white" required><option value="">Select config...</option>{configs?.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}<option value="Custom">Custom</option></select><div className="grid grid-cols-3 gap-3"><Input type="number" value={formData.fps} onChange={(e) => setFormData({...formData, fps: e.target.value})} placeholder="60" className="bg-slate-800/50 border-purple-500/30 text-white" required /><Input type="number" value={formData.ping} onChange={(e) => setFormData({...formData, ping: e.target.value})} placeholder="50ms" className="bg-slate-800/50 border-purple-500/30 text-white" /><Input type="number" value={formData.memory_usage} onChange={(e) => setFormData({...formData, memory_usage: e.target.value})} placeholder="2048MB" className="bg-slate-800/50 border-purple-500/30 text-white" /></div><Textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Notes..." className="bg-slate-800/50 border-purple-500/30 text-white" rows={2}/><Button type="submit" disabled={saving} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">{saving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Save className="w-4 h-4 mr-2"/>}Save Log</Button></form></CardContent>}
    </Card>
  );
}