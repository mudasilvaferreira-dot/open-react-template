"use client";
import React, { useEffect, useState } from "react";
import { ModernCapsuleTable, Capsule } from "@/components/ModernCapsuleTable";
import { supabase } from "@/lib/supabaseClient";

export default function ReportsPage() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCapsules() {
      setLoading(true);
      const { data, error } = await supabase.from("teste").select("*");
      if (error) {
        setCapsules([]);
      } else {
        const mapped = (data || []).map((item: any) => ({
          capsula_id: item.capsula_id,
          p: item.p,
          receita_k21000: item.receita_k21000,
          inicio_capsula: item.inicio_capsula,
          fim_capsula: item.fim_capsula,
        }));
        setCapsules(mapped);
      }
      setLoading(false);
    }
    fetchCapsules();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-400">Reports</h1>
      {loading ? (
        <div className="text-white text-sm">Carregando...</div>
      ) : (
        <ModernCapsuleTable capsules={capsules} />
      )}
    </div>
  );
}
