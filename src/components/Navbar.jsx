import { useState, useEffect } from 'react'
import { Moon, Sun, Settings, Home, MessageSquare } from 'lucide-react'

export default function Navbar({ onToggleSettings, onToggleChat }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5 text-blue-500" />
          <span className="font-semibold tracking-tight text-slate-800 dark:text-slate-100">Bank Al‑Hazz</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleChat?.()}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-300"
          >
            <MessageSquare className="w-4 h-4" /> Chat
          </button>
          <button
            onClick={() => onToggleSettings?.()}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button
            onClick={() => setDark(v => !v)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  )
}
