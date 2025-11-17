import React, { useState, useMemo } from "react";

export type Capsule = {
  receita_k21000: string | null;
  inicio_capsula: string;
  fim_capsula: string;
};

type ModernCapsuleTableProps = {
  capsules: Capsule[];
};

export const ModernCapsuleTable: React.FC<ModernCapsuleTableProps> = ({
  capsules,
}) => {
  const [filter, setFilter] = useState({
    receita_k21000: "",
  });

  // Valores únicos para filtro de receita_k21000
  const uniqueReceitas = useMemo(
    () =>
      Array.from(
        new Set(
          capsules
            .map((c) => c.receita_k21000)
            .filter((v) => v && v.trim() !== "")
        )
      ),
    [capsules]
  );

  // Filtrando cápsulas conforme seleção
  const filteredCapsules = useMemo(() => {
    return capsules.filter(
      (capsule) =>
        !filter.receita_k21000 ||
        capsule.receita_k21000 === filter.receita_k21000
    );
  }, [capsules, filter]);

  return (
    <div className="overflow-x-auto rounded-xl shadow-2xl bg-[#18181b] p-6">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          {/* Linha de filtro */}
          <tr>
            <th className="px-3 py-2 bg-[#23272f] rounded-tl-xl">
              <select
                className="w-full bg-[#18181b] text-xs text-white border border-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={filter.receita_k21000}
                onChange={(e) => setFilter({ receita_k21000: e.target.value })}
              >
                <option value="">Todos</option>
                {uniqueReceitas.map((rec) => (
                  <option key={rec as string} value={rec as string}>
                    {rec}
                  </option>
                ))}
              </select>
            </th>
            <th className="px-3 py-2 bg-[#23272f]"></th>
            <th className="px-3 py-2 bg-[#23272f] rounded-tr-xl"></th>
          </tr>
          {/* Linha de títulos */}
          <tr>
            <th className="px-3 py-2 text-left bg-[#1f2937] text-orange-400 text-xs uppercase tracking-wider rounded-tl-xl">
              Receita K21000
            </th>
            <th className="px-3 py-2 text-left bg-[#1f2937] text-orange-400 text-xs uppercase tracking-wider">
              Início Cápsula
            </th>
            <th className="px-3 py-2 text-left bg-[#1f2937] text-orange-400 text-xs uppercase tracking-wider rounded-tr-xl">
              Fim Cápsula
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCapsules.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="text-center text-gray-400 py-4 text-xs"
              >
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
          {filteredCapsules.map((capsule, idx) => (
            <tr
              key={idx}
              className="bg-[#23272f] hover:bg-[#27272a] transition rounded-lg shadow border-l-4 border-orange-500"
            >
              <td className="px-3 py-2 text-xs text-white">
                {capsule.receita_k21000 && capsule.receita_k21000.trim() !== ""
                  ? capsule.receita_k21000
                  : "-"}
              </td>
              <td className="px-3 py-2 text-xs text-white">
                {capsule.inicio_capsula}
              </td>
              <td className="px-3 py-2 text-xs text-white">
                {capsule.fim_capsula}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
