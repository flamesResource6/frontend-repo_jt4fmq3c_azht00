import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board'
import PlayerSidebar from './components/PlayerSidebar'
import ChatPanel from './components/ChatPanel'

function useBalances(roomId) {
  const [balances, setBalances] = useState({})
  useEffect(() => {
    if (!roomId) return
    const base = import.meta.env.VITE_BACKEND_URL
    if (!base) return
    fetch(`${base}/rooms/${roomId}/balances`).then(r=>r.json()).then(d=>{
      if (d && d.balances) setBalances(d.balances)
    }).catch(()=>{})
  }, [roomId])
  return [balances, setBalances]
}

export default function App() {
  const [roomId, setRoomId] = useState(1)
  const [players] = useState([
    { id: 1, name: 'You', color: '#22c55e', balance: 1500 },
    { id: 2, name: 'Rival', color: '#ef4444', balance: 1500 },
  ])
  const [tokens] = useState([
    { id: 1, x: 8, y: 90, color: '#22c55e' },
    { id: 2, x: 14, y: 90, color: '#ef4444' },
  ])
  const [boardMap, setBoardMap] = useState({
    1: 1, 2: 2, 3: 3, 4: 4,
    6: 5, 7: 6, 8: 7, 9: 8,
    11: 9, 12: 10, 13: 11, 14: 12,
    16: 13, 17: 14, 18: 15, 19: 16,
    21: 17, 22: 18, 23: 19, 24: 20,
    26: 21, 27: 22, 28: 23, 29: 24,
    31: 25, 32: 26, 33: 27, 34: 28, 35: 29, 36: 30, 37: 31, 38: 32, 39: 33
  })
  const [showSettings, setShowSettings] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [balances] = useBalances(roomId)

  const onTileClick = (pos) => {
    console.log('tile', pos)
  }

  const onRoll = () => {
    console.log('roll')
  }

  const onEndTurn = () => {
    console.log('end turn')
  }

  const summary = useMemo(() => ({ players: players.length, mapped: Object.keys(boardMap).length }), [players.length, boardMap])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar onToggleSettings={()=>setShowSettings(v=>!v)} onToggleChat={()=>setShowChat(v=>!v)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200/20 dark:border-slate-700/40 bg-white/5 p-4">
            <div className="flex items-center justify-between text-slate-200">
              <div className="text-sm">Players: {summary.players} • Tiles mapped: {summary.mapped}</div>
              <div className="text-xs opacity-70">Room #{roomId}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 bg-slate-900/30 p-3">
            <Board boardMap={boardMap} tokens={tokens} onTileClick={onTileClick} />
          </div>
        </section>

        <PlayerSidebar players={players} balances={balances} onRoll={onRoll} onEndTurn={onEndTurn} />
      </main>

      {showChat && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[380px] bg-white/80 dark:bg-slate-900/80 backdrop-blur border-l border-slate-200/30 dark:border-slate-700/30 shadow-2xl animate-in">
          <ChatPanel roomId={roomId} />
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 animate-in">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-700/40 p-4">
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold">Settings</h3>
            <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <label className="block">
                <span className="block mb-1">Room ID</span>
                <input value={roomId} onChange={e=>setRoomId(Number(e.target.value)||1)} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
              </label>
              <p>Backend: {import.meta.env.VITE_BACKEND_URL || 'not set'}</p>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={()=>setShowSettings(false)} className="px-3 py-2 rounded-md bg-slate-700 text-white">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
