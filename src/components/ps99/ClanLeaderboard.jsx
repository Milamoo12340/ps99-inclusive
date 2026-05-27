import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users, Diamond } from "lucide-react";

export default function ClanLeaderboard() {
  const [clans, setClans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { loadClans(); }, [page]);

  const loadClans = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://ps99.biggamesapi.io/api/clans?page=${page}&pageSize=20&sort=Points&sortOrder=desc`);
      const result = await response.json();
      if (result.status === "ok") setClans(result.data);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const filteredClans = clans.filter(clan => clan.Name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><Input placeholder="Search clans..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-slate-800/50 border-purple-500/30 text-white" /></div>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {loading ? Array(10).fill(0).map((_, i) => <div key={i} className="p-4 bg-slate-800/30 rounded-lg"><Skeleton className="h-5 w-1/3 mb-2" /><Skeleton className="h-4 w-2/3" /></div>) : filteredClans.map((clan, index) => (
          <div key={clan.Name} className="p-4 bg-slate-800/30 border border-purple-500/10 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500 text-yellow-900' : index === 1 ? 'bg-gray-400 text-gray-900' : index === 2 ? 'bg-orange-500 text-orange-900' : 'bg-purple-500/20 text-purple-300'}`}>{index+1}</div>
                <div><h3 className="font-bold text-white">{clan.Name}</h3><div className="flex gap-3 mt-1 text-xs text-gray-400"><span className="flex items-center gap-1"><Users className="w-3 h-3" />{clan.Members}/{clan.MemberCapacity}</span><span className="flex items-center gap-1"><Diamond className="w-3 h-3" />{(clan.DepositedDiamonds||0).toLocaleString()}</span></div></div>
              </div>
              <div className="text-right"><p className="font-bold text-purple-400 text-xl">{(clan.Points||0).toLocaleString()}</p><p className="text-xs text-gray-400">points</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2"><button onClick={() => setPage(Math.max(1, page-1))} disabled={page===1} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg disabled:opacity-50">Previous</button><span className="px-4 py-2 text-white">Page {page}</span><button onClick={() => setPage(page+1)} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg">Next</button></div>
    </div>
  );
}