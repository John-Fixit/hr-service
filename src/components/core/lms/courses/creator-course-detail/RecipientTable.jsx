import { useMemo, useState } from "react";


function StatusBadge({ status }) {
  const map = {
    completed: "bg-green-100 text-green-700",
    progress:  "bg-amber-50 text-amber-600",
    none:      "bg-slate-100 text-slate-500",
  };
  const labels = { completed:"Completed", progress:"In Progress", none:"Not Started" };
  return (
    <span className={`${map[status]} text-[11px] font-semibold px-2.5 py-0.5 rounded-full`}>
      {labels[status]}
    </span>
  );
}



function ScoreText({ score }) {
  if (score === null) return <span className="text-slate-400 font-bold">—</span>;
  const color = score >= 80 ? "text-green-500" : score >= 60 ? "text-amber-500" : "text-red-500";
  return <span className={`${color} font-bold text-[13px]`}>{score}%</span>;
}


const getStatus   = s => s.lessons === 0 ? "none" : s.lessons >= s?.total_lessons ? "completed" : "progress";
const getProgress = s => Math.round((s.lessons / s?.total_lessons) * 100);
const getInitials = n => n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();


function Avatar({ name, color, size = 32 }) {
  const fontSize = size * 0.35;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, background: color, fontSize }}
    >
      {getInitials(name)}
    </div>
  );
}

const RecipientTable=({ students }) => {
  const [tab,    setTab]    = useState("all");
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [modal,  setModal]  = useState(null);

  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(s => {
      const matchTab = tab === "all" || getStatus(s) === tab;
      const matchQ   = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      return matchTab && matchQ;
    });
  }, [students, tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const slice      = filtered.slice((safePage-1)*PAGE_SIZE, safePage*PAGE_SIZE);

  const TABS = [
    { key:"all",       label:"All" },
    { key:"progress",  label:"In Progress" },
    { key:"completed", label:"Completed" },
    { key:"none",      label:"Not Started" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-wrap gap-3">
        <div>
          <div className="font-bold text-[#0f1b35] text-[15px]" style={{fontFamily:"Sora,sans-serif"}}>Recipients</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Staff enrolled in this course</div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name or email…"
              className="pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none w-48 focus:border-[#1abc9c]"
            />
          </div>
          {/* <button
            onClick={() => {}}
            className="bg-[#0f1b35] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            style={{fontFamily:"Sora,sans-serif"}}
          >
            📥 Export
          </button> */}
          {/* <button
            className="bg-[#f47c20] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            style={{fontFamily:"Sora,sans-serif"}}
          >
            + Enroll
          </button> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 px-6">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setPage(1); }}
            className={`text-xs font-semibold px-4 py-3 border-b-2 cursor-pointer bg-transparent transition-colors duration-200 -mb-px ${
              tab === t.key
                ? "border-[#1abc9c] text-[#1abc9c]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
            style={{fontFamily:"Sora,sans-serif"}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {slice.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-[13px]">No students found.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="mt-3">
                {["Student","Lessons Done","Progress","Quiz Score","Status","Actions"].map(h => (
                  <th
                    key={h}
                    className="text-left px-3.5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50"
                    style={{fontFamily:"Sora,sans-serif"}}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.map(s => {
                const progress = getProgress(s);
                return (
                  <tr
                    key={s.email}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors duration-150"
                  >
                    {/* Student */}
                    <td className="px-3.5 py-3 align-middle">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} color={s.color} />
                        <div>
                          <div className="font-semibold text-[13px] text-[#0f1b35]">{s.name}</div>
                          <div className="text-[11px] text-slate-400">{s.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Lessons */}
                    <td className="px-3.5 py-3 text-center-middle text-[13px]">
                      {s.lessons} <span className="text-slate-300">/ {s?.total_lessons}</span>
                    </td>

                    {/* Progress */}
                    <td className="px-3.5 py-3 align-middle min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1abc9c] rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700 min-w-[32px] text-right">{progress}%</span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="px-3.5 py-3 text-center"><ScoreText score={s.score} /></td>

                    {/* Last Active */}
                    {/* <td className="px-3.5 py-3 align-middle text-slate-400 text-xs">{s.lastActive}</td> */}

                    {/* Status */}
                    <td className="px-3.5 py-3 align-middle"><StatusBadge status={getStatus(s)} /></td>

                    {/* Actions */}
                    <td className="px-3.5 py-3 align-middle">
                      <div className="flex gap-1.5">
                        {[
                          { icon:"👁",  action: () => setModal(s) },
                          { icon:"🗑", action: () => {} },
                        ].map(btn => (
                          <button
                            key={btn.icon}
                            onClick={btn.action}
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white cursor-pointer text-[13px] flex items-center justify-center hover:border-[#1abc9c] transition-colors duration-200"
                          >
                            {btn.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-3.5 border-t border-slate-100 bg-slate-50/60">
        <span className="text-xs text-slate-400">
          {filtered.length > 0
            ? `Showing ${(safePage-1)*PAGE_SIZE+1}–${Math.min(safePage*PAGE_SIZE,filtered.length)} of ${filtered.length} students`
            : ""}
        </span>
        <div className="flex gap-1.5 items-center">
          <button
            disabled={safePage <= 1}
            onClick={() => setPage(p => p-1)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer disabled:opacity-30"
            style={{fontFamily:"Sora,sans-serif"}}
          >← Prev</button>
          {Array.from({ length: totalPages }, (_,i) => i+1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-7 h-7 rounded-lg text-[11px] font-bold cursor-pointer ${
                n === safePage
                  ? "bg-[#1abc9c] text-white border-none"
                  : "border border-slate-200 bg-white text-slate-400"
              }`}
              style={{fontFamily:"Sora,sans-serif"}}
            >{n}</button>
          ))}
          <button
            disabled={safePage >= totalPages}
            onClick={() => setPage(p => p+1)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer disabled:opacity-30"
            style={{fontFamily:"Sora,sans-serif"}}
          >Next →</button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          onClick={e => e.target===e.currentTarget && setModal(null)}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar name={modal.name} color={modal.color} size={40} />
                <div>
                  <div className="font-bold text-[#0f1b35] text-sm" style={{fontFamily:"Sora,sans-serif"}}>{modal.name}</div>
                  <div className="text-[11px] text-slate-400">{modal.email}</div>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="bg-transparent border-none text-lg text-slate-400 cursor-pointer leading-none"
              >✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-6">
              {[
                { label:"Quiz Score",   value: modal.score!==null?modal.score+"%":"—" },
                { label:"Progress",     value: getProgress(modal)+"%" },
                { label:"Lessons Done", value: `${modal.lessons} / ${modal?.total_lessons}` },
                { label:"Last Active",  value: modal.lastActive },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1"
                    style={{fontFamily:"Sora,sans-serif"}}
                  >{item.label}</div>
                  <div
                    className="font-bold text-[22px] text-[#0f1b35]"
                    style={{fontFamily:"Sora,sans-serif"}}
                  >{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 px-6 pb-6">
              <button
                className="flex-1 bg-[#1abc9c] text-white border-none rounded-xl py-2.5 text-xs font-semibold cursor-pointer"
                style={{fontFamily:"Sora,sans-serif"}}
              >💬 Message</button>
              <button
                className="flex-1 bg-white text-red-500 border border-red-200 rounded-xl py-2.5 text-xs font-semibold cursor-pointer"
                style={{fontFamily:"Sora,sans-serif"}}
              >🗑 Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientTable;