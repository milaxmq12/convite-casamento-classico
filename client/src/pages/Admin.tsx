/**
 * Admin — Painel de gerenciamento de convidados
 * Acesso público (sem senha), rota /admin
 * Paleta: Off-white + Dourado — consistente com o convite
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Users, CheckCircle, XCircle, Utensils, Trash2,
  RefreshCw, Download, MessageSquare, Search, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const FLORAL_ORNAMENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348239620/KirE3dTZFbG3AbQWJYn9MY/wedding-floral-ornament-cnMzDwJtgYJsGoFoy7GVaj.webp";

const toastStyle = {
  fontFamily: "'EB Garamond', serif",
  background: "#FFFFFF",
  border: "1px solid rgba(201,168,76,0.4)",
  color: "#2C2416",
  borderRadius: "2px",
};

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number | string; color: string;
}) {
  return (
    <div
      className="rounded-sm p-6 flex items-center gap-4"
      style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 2px 12px rgba(201,168,76,0.07)" }}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div>
        <p className="font-label text-[0.55rem] tracking-[0.25em] uppercase text-[#8A7D68]">{label}</p>
        <p className="font-display text-3xl font-light text-[#2C2416]">{value}</p>
      </div>
    </div>
  );
}

export default function Admin() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: rsvps = [], isLoading, refetch } = trpc.rsvp.list.useQuery();
  const { data: stats } = trpc.rsvp.stats.useQuery();

  const deleteMutation = trpc.rsvp.delete.useMutation({
    onSuccess: () => {
      utils.rsvp.list.invalidate();
      utils.rsvp.stats.invalidate();
      toast.success("Convidado removido.", { style: toastStyle });
      setDeletingId(null);
    },
    onError: () => {
      toast.error("Erro ao remover. Tente novamente.", { style: toastStyle });
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Remover "${name}" da lista?`)) return;
    setDeletingId(id);
    deleteMutation.mutate({ id });
  };

  const handleExport = () => {
    const filtered = getFiltered();
    const header = "Nome,Email,Presença,Convidados,Restrições,Mensagem,Data\n";
    const rows = filtered.map((r) =>
      [
        `"${r.name}"`,
        `"${r.email}"`,
        r.attendance === "yes" ? "Confirmado" : "Recusado",
        r.guests,
        `"${r.dietary ?? ""}"`,
        `"${r.message ?? ""}"`,
        new Date(r.createdAt).toLocaleDateString("pt-BR"),
      ].join(",")
    );
    const csv = header + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "convidados-isabella-rafael.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Lista exportada com sucesso!", { style: toastStyle });
  };

  const getFiltered = () => {
    return rsvps.filter((r) => {
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || r.attendance === filter;
      return matchSearch && matchFilter;
    });
  };

  const filtered = getFiltered();

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(250,250,247,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(201,168,76,0.18)" }}
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 font-label text-[0.58rem] tracking-[0.2em] uppercase text-[#9A7A20] hover:text-[#C9A84C] transition-colors">
              <ArrowLeft size={14} />
              Convite
            </button>
          </Link>
          <div className="w-px h-5 bg-[rgba(201,168,76,0.3)]" />
          <div className="font-display text-xl font-light gold-gradient-text">I & R</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 font-label text-[0.58rem] tracking-[0.2em] uppercase text-[#8A7D68] hover:text-[#9A7A20] transition-colors px-3 py-2 border border-[rgba(201,168,76,0.3)] rounded-sm hover:border-[#C9A84C]"
          >
            <RefreshCw size={12} />
            Atualizar
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 btn-wedding-primary py-2 px-4 text-[0.58rem]"
          >
            <Download size={12} />
            Exportar CSV
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <img src={FLORAL_ORNAMENT} alt="" className="w-40 opacity-40" />
          </div>
          <p className="font-label text-[0.58rem] tracking-[0.42em] uppercase text-[#9A7A20] mb-2">
            Painel de Administração
          </p>
          <h1 className="font-display text-4xl font-light text-[#2C2416] italic">
            Gerenciamento de Convidados
          </h1>
          <p className="font-body text-sm text-[#8A7D68] mt-2 italic">
            Casamento Isabella & Rafael · 14 de Setembro de 2025
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={20} />}       label="Total de Respostas" value={stats?.total ?? 0}       color="#C9A84C" />
          <StatCard icon={<CheckCircle size={20} />} label="Confirmados"        value={stats?.confirmed ?? 0}   color="#22c55e" />
          <StatCard icon={<XCircle size={20} />}     label="Recusados"          value={stats?.declined ?? 0}    color="#ef4444" />
          <StatCard icon={<Utensils size={20} />}    label="Total de Pessoas"   value={stats?.totalGuests ?? 0} color="#8b5cf6" />
        </div>

        {/* Filters & search */}
        <div
          className="rounded-sm p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
          style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-sm font-body text-sm text-[#2C2416] placeholder:text-[#8A7D68] placeholder:italic focus:outline-none focus:ring-1 focus:ring-[rgba(201,168,76,0.4)]"
              style={{ background: "#FAFAF7", border: "1px solid #E0D9C8" }}
            />
          </div>
          <div className="flex gap-2">
            {(["all", "yes", "no"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-label text-[0.55rem] tracking-[0.2em] uppercase px-4 py-2.5 rounded-sm border transition-all duration-200"
                style={{
                  background: filter === f ? "#C9A84C" : "transparent",
                  borderColor: filter === f ? "#9A7A20" : "#E0D9C8",
                  color: filter === f ? "#FFFFFF" : "#8A7D68",
                }}
              >
                {f === "all" ? "Todos" : f === "yes" ? "Confirmados" : "Recusados"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-sm overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-[rgba(201,168,76,0.3)] border-t-[#C9A84C] rounded-full animate-spin mb-4" />
              <p className="font-body text-sm text-[#8A7D68] italic">Carregando convidados...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <img src={FLORAL_ORNAMENT} alt="" className="w-32 mx-auto opacity-25 mb-4" />
              <p className="font-display text-xl font-light text-[#8A7D68] italic">
                {search || filter !== "all" ? "Nenhum convidado encontrado." : "Nenhuma confirmação recebida ainda."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.2)", background: "#FAFAF7" }}>
                    {["Nome", "E-mail", "Presença", "Pessoas", "Restrições", "Mensagem", "Data", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-label text-[0.52rem] tracking-[0.2em] uppercase text-[#9A7A20]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((rsvp, i) => (
                    <tr
                      key={rsvp.id}
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
                      className="hover:bg-[rgba(201,168,76,0.03)] transition-colors"
                    >
                      <td className="px-4 py-3 font-body text-sm font-medium text-[#2C2416]">
                        {rsvp.name}
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-[#5A4E38]">
                        {rsvp.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1.5 font-label text-[0.52rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm"
                          style={{
                            background: rsvp.attendance === "yes" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                            color:      rsvp.attendance === "yes" ? "#16a34a" : "#dc2626",
                            border:     `1px solid ${rsvp.attendance === "yes" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                          }}
                        >
                          {rsvp.attendance === "yes" ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {rsvp.attendance === "yes" ? "Confirmado" : "Recusado"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-[#5A4E38] text-center">
                        {rsvp.attendance === "yes" ? rsvp.guests : "—"}
                      </td>
                      <td className="px-4 py-3 font-body text-xs text-[#8A7D68] italic max-w-[140px] truncate">
                        {rsvp.dietary || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {rsvp.message ? (
                          <span
                            title={rsvp.message}
                            className="inline-flex items-center gap-1 font-body text-xs text-[#9A7A20] cursor-help"
                          >
                            <MessageSquare size={12} />
                            <span className="max-w-[120px] truncate">{rsvp.message}</span>
                          </span>
                        ) : (
                          <span className="text-[#C8C0B0] font-body text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-body text-xs text-[#8A7D68]">
                        {new Date(rsvp.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit", month: "2-digit", year: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(rsvp.id, rsvp.name)}
                          disabled={deletingId === rsvp.id}
                          className="text-[#C8C0B0] hover:text-[#ef4444] transition-colors disabled:opacity-50"
                          title="Remover convidado"
                        >
                          {deletingId === rsvp.id
                            ? <span className="inline-block w-3.5 h-3.5 border border-[#ef4444] border-t-transparent rounded-full animate-spin" />
                            : <Trash2 size={14} />
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="font-body text-xs text-[#8A7D68] italic text-right mt-3">
            Exibindo {filtered.length} de {rsvps.length} resposta{rsvps.length !== 1 ? "s" : ""}
          </p>
        )}
      </main>
    </div>
  );
}
