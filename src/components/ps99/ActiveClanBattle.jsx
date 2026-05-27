import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Swords, Gift } from "lucide-react";

export default function ActiveClanBattle() {
  const [battle, setBattle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBattle() {
      setLoading(true);
      try {
        const response = await fetch("https://ps99.biggamesapi.io/api/activeClanBattle");
        const result = await response.json();
        if (result.status === "ok") setBattle(result.data);
      } catch (error) { console.error(error); }
      setLoading(false);
    }
    loadBattle();
  }, []);

  if (loading) return <div className="space-y-4"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-20 w-full" /></div>;
  if (!battle) return <div className="text-center py-8 text-gray-400">No active clan battle at the moment</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"><Swords className="w-6 h-6 text-white" /></div>
        <div><h3 className="font-bold text-white text-lg">{battle.configName}</h3><Badge className="mt-1 bg-green-500/20 text-green-300 border-green-500/30">Active Now</Badge></div>
      </div>
      <div className="p-3 bg-blue-900/10 border border-blue-500/30 rounded-lg"><p className="text-blue-300 text-sm"><strong>Tip:</strong> Contribute to your clan battle to earn rewards!</p></div>
    </div>
  );
}