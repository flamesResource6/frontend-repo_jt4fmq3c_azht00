import { useEffect, useRef, useState } from 'react'
import Pusher from 'pusher-js'

export default function ChatPanel({ roomId }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!roomId) return
    const key = import.meta.env.VITE_PUSHER_KEY
    const cluster = import.meta.env.VITE_PUSHER_CLUSTER
    if (!key || !cluster) return

    const pusher = new Pusher(key, { cluster })
    const channel = pusher.subscribe(`room-${roomId}`)
    channel.bind('chat', data => {
      setMessages(m => [...m, data])
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [roomId])

  const send = async (e) => {
    e?.preventDefault()
    if (!text.trim()) return
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      await fetch(`${base}/chat/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      setText('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-3">
        {messages.map((m, i) => (
          <div key={i} className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">{m.user?.name || 'Player'}:</span> {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={send} className="p-3 border-t border-slate-200/60 dark:border-slate-700/40 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 rounded-md bg-white/70 dark:bg-slate-800/70 px-3 py-2" placeholder="Type message..." />
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Send</button>
      </form>
    </div>
  )
}
