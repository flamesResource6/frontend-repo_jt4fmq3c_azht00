import { useMemo } from 'react'
import Tile from './Tile'

export default function Board({ boardMap = {}, tokens = [], onTileClick }) {
  // 40-tile loop; render 10 per side
  const tiles = useMemo(() => Array.from({ length: 40 }, (_, i) => i), [])

  return (
    <div className="relative aspect-square max-w-4xl mx-auto grid grid-cols-11 grid-rows-11 [perspective:1200px]">
      {/* Grid: outer ring used, center area combines into board center */}
      {tiles.map((idx) => {
        const pos = idx + 1
        const isCorner = [1, 10, 20, 30].includes(pos)
        const special = {5:'TAX',10:'JAIL',20:'BONUS',30:'REVERSE'}[pos]
        const cityId = boardMap[pos]
        return (
          <Tile
            key={pos}
            index={pos}
            isCorner={isCorner}
            special={special}
            cityId={cityId}
            onClick={() => onTileClick?.(pos)}
          />
        )
      })}

      {/* Tokens overlay */}
      <div className="pointer-events-none absolute inset-4 -z-10 rounded-xl" />
      <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(12deg)]">
        {tokens.map((t, i) => (
          <div
            key={i}
            className="absolute w-5 h-5 rounded-full shadow-lg shadow-black/30"
            style={{
              background: t.color || '#22c55e',
              left: `${t.x}%`,
              top: `${t.y}%`,
              transition: 'left .3s ease, top .3s ease, transform .3s',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </div>
  )
}
