export default function Tile({ index, isCorner, special, cityId, onClick }) {
  const label = special ? special : (cityId ? `City ${cityId}` : `Tile ${index}`)
  return (
    <button
      onClick={onClick}
      className={`border border-slate-300/40 dark:border-slate-700/40 bg-white/70 dark:bg-slate-800/70 backdrop-blur text-[10px] sm:text-xs p-1 sm:p-2 hover:shadow-md transition-shadow ${
        isCorner ? 'col-span-2 row-span-2 rounded-lg' : 'rounded'
      }`}
      title={label}
    >
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <div className="w-full h-2 rounded bg-gradient-to-r from-blue-500/60 to-purple-500/60" />
        <span className="text-slate-700 dark:text-slate-100 truncate max-w-[72px]">{label}</span>
      </div>
    </button>
  )
}
