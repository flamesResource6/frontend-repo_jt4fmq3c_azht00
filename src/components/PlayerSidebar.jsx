import { useEffect } from 'react'

export default function PlayerSidebar({ players = [], balances = {}, onRoll, onEndTurn }) {
  useEffect(() => {}, [players, balances])
  return (
    <aside className="w-full md:w-72 shrink-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur border-l border-slate-200/50 dark:border-slate-700/40 rounded-xl md:rounded-none p-4 space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-100 tracking-tight">Players</h3>
      <div className="space-y-2">
        {players.map(p => (
          <div key={p.id} className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{background:p.color||'#22c55e'}} />
              <span className="text-sm text-slate-700 dark:text-slate-200">{p.name || `Player ${p.id}`}</span>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{balances[p.id] ?? p.balance ?? 0}</span>
          </div>
        ))}
      </div>
      <div className="pt-2 grid grid-cols-2 gap-2">
        <button onClick={onRoll} className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">Roll</button>
        <button onClick={onEndTurn} className="px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-800 text-white text-sm">End Turn</button>
      </div>
    </aside>
  )
}
